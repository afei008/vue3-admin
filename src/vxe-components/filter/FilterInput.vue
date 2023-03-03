<!-- @format -->

<template>
  <div class="filter-input">
    <el-input
      v-model="formData.data.name"
      type="text"
      placeholder="支持回车筛选"
      @keyup.enter="keyupEvent"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, reactive } from 'vue';
import type { VxeGlobalRendererHandles } from 'vxe-table';

export default defineComponent({
  name: 'FilterInput',
  props: {
    params: Object as PropType<VxeGlobalRendererHandles.RenderFilterParams>,
  },
  setup(props) {
    const formData = reactive({
      data: {
        name: '',
      },
    });

    const optionState = reactive({
      option: null as any,
    });

    const load = () => {
      const { params } = props;
      if (params) {
        const { column } = params;
        const option = column.filters[0];
        optionState.option = option;
        formData.data = { ...formData.data, ...option.data };
      }
    };

    const keyupEvent = (e: KeyboardEvent) => {
      const { key } = e;
      optionState.option.data = {
        ...optionState.option.data,
        ...formData.data,
      };

      const { params } = props;
      const { option } = optionState;
      if (params && option) {
        const { $panel } = params;
        const checked = !!option.data.name;
        $panel.changeOption(null, checked, option);
        if (key === 'Enter') {
          $panel.confirmFilter(e);
        }
      }
    };

    load();

    return {
      formData,
      keyupEvent,
    };
  },
});
</script>

<style scoped>
.filter-input {
  padding: 10px;
}
</style>
