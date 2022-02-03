<!-- @format -->

<template>
  <div class="filter-input">
    <a-input
      type="text"
      v-model:value="formData.data.name"
      placeholder="支持回车筛选"
      @pressEnter="keyupEvent"
    ></a-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import { VxeGlobalRendererHandles } from 'vxe-table';

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
