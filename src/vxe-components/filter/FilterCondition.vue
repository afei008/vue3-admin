<!-- @format -->

<template>
  <div class="filter-condition">
    <div class="filter-head">
      <a-radio-group v-model:value="formData.data.type">
        <a-radio value="has" name="fType">包含</a-radio>
        <a-radio value="eq" name="fType">等于</a-radio>
      </a-radio-group>
    </div>
    <div class="filter-body">
      <a-input
        v-model:value="formData.data.name"
        type="text"
        placeholder="请输入名称"
      />
    </div>
    <div class="filter-footer">
      <a-button type="primary" @click="confirmEvent">确认</a-button>
      <a-button @click="resetEvent">重置</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, reactive } from 'vue';
import type { VxeGlobalRendererHandles } from 'vxe-table';

export default defineComponent({
  name: 'FilterComplex',
  props: {
    params: Object as PropType<VxeGlobalRendererHandles.RenderFilterParams>,
  },
  setup(props) {
    const formData = reactive({
      data: {
        type: 'has',
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

    const confirmEvent = () => {
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
        $panel.confirmFilter();
      }
    };

    const resetEvent = () => {
      const { params } = props;
      if (params) {
        const { $panel } = params;
        $panel.resetFilter();
      }
    };

    load();

    return {
      formData,
      confirmEvent,
      resetEvent,
    };
  },
});
</script>

<style lang="scss" scoped>
.filter-condition {
  padding: 10px 15px;

  .filter-body {
    padding: 10px 0;
  }

  .filter-footer {
    text-align: center;

    button {
      margin: 0 10px;
    }
  }
}
</style>
