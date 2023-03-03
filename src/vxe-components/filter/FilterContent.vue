<!-- @format -->

<template>
  <div class="filter-content">
    <div class="filter-head">
      <el-input v-model="formData.data.searchValue" placeholder="搜索">
        <template #append>
          <el-button :icon="Search" @click="searchEvent" />
        </template>
      </el-input>
    </div>
    <div class="filter-body">
      <template v-if="optionState.valList.length">
        <ul class="list list-head">
          <li class="list-item">
            <el-checkbox v-model="optionState.isAll" @change="changeAllEvent">
              全选
            </el-checkbox>
          </li>
        </ul>
        <ul class="list list-body">
          <li
            v-for="(item, sIndex) in optionState.valList"
            :key="sIndex"
            class="list-item"
          >
            <el-checkbox v-model="item.checked">{{ item.value }}</el-checkbox>
          </li>
        </ul>
      </template>
      <template v-else>
        <div class="list-empty">无匹配项</div>
      </template>
    </div>
    <div class="filter-footer">
      <el-button type="primary" @click="confirmFilterEvent">确认</el-button>
      <el-button @click="resetFilterEvent">重置</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, reactive } from 'vue';
import type { VxeGlobalRendererHandles } from 'vxe-table';
import XEUtils from 'xe-utils';
import { Search } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'FilterContent',
  props: {
    params: Object as PropType<VxeGlobalRendererHandles.RenderFilterParams>,
  },
  setup(props) {
    interface ColValItem {
      checked: boolean;
      value: string;
    }

    const formData = reactive({
      data: {
        values: [''],
        searchValue: '',
      },
    });

    const optionState = reactive({
      isAll: false,
      option: null as any,
      colValList: [] as ColValItem[],
      valList: [] as ColValItem[],
    });

    const searchEvent = () => {
      const { option, colValList } = optionState;
      if (option) {
        optionState.valList = formData.data.searchValue
          ? colValList.filter(
              (item) => item.value.indexOf(formData.data.searchValue) > -1
            )
          : colValList;
      }
    };

    const load = () => {
      const { params } = props;
      if (params) {
        const { $table, column } = params;
        const { fullData } = $table.getTableData();
        const option = column.filters[0];

        optionState.option = option;
        formData.data = { ...formData.data, ...option.data };

        const { values } = formData.data;
        const colValList = Object.keys(
          XEUtils.groupBy(fullData, column.property)
        ).map(
          (val) =>
            ({
              checked: values.includes(val),
              value: val,
            } as ColValItem)
        );
        optionState.colValList = colValList;
        optionState.valList = colValList;
      }
      searchEvent();
    };

    const changeAllEvent = () => {
      const { isAll } = optionState;
      optionState.valList.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.checked = isAll;
      });
    };

    const confirmFilterEvent = () => {
      optionState.option.data = {
        ...optionState.option.data,
        ...formData.data,
      };

      const { params } = props;
      const { option, valList } = optionState;
      if (params && option) {
        const { data } = option;
        const { $panel } = params;
        data.values = valList
          .filter((item) => item.checked)
          .map((item) => item.value);

        $panel.changeOption(null, true, option);
        $panel.confirmFilter();
      }
    };

    const resetFilterEvent = () => {
      const { params } = props;
      if (params) {
        const { $panel } = params;
        $panel.resetFilter();
      }
    };

    load();

    return {
      formData,
      optionState,
      searchEvent,
      changeAllEvent,
      confirmFilterEvent,
      resetFilterEvent,
      Search,
    };
  },
});
</script>

<style lang="scss" scoped>
.filter-content {
  padding: 10px;
  user-select: none;

  .filter-head {
    padding: 5px 0;
  }

  .filter-footer {
    padding-top: 10px;
    text-align: right;

    button {
      padding: 0 15px;
      margin-left: 15px;
    }
  }

  .filter-body {
    padding: 2px 10px;

    .list {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    .list-body {
      height: 120px;
      overflow: auto;
    }

    .list-empty {
      padding: 20px 0;
      text-align: center;
    }
  }
}
</style>
