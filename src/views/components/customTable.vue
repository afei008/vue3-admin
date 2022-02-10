<!-- @format -->

<template>
  <div>
    <p>此组件主要用于学习如何自己实现一个 table 组件</p>
    <p>
      antd 的传参方式相对简单，因为表头是同个一个属性传入的，并且 slot
      都是同一级
    </p>
    <p>
      element-ui 的难点在于表头的获取和 slot
      的展示，需要用到渲染函数。table-column
      本身并不参与展示，只是用于收集表头和 slot，然后在 table-head 和 table-body
      处渲染
    </p>
    <h1>类似 antd 表格的传参方式</h1>
    <b-table :data="tableData" :columns="columns">
      <template #detail="record">
        <a-button>{{ record.rowData }}</a-button>
      </template>
    </b-table>
    <h1>类似 element-ui 表格的传参方式</h1>
    <e-table :data="tableData">
      <e-table-column :sortable="true" :prop="'big'" :label="'大小'">
      </e-table-column>
      <e-table-column
        :sortable="true"
        :prop="'address'"
        :label="'地址'"
      ></e-table-column>
      <e-table-column
        :sortable="true"
        :prop="'name'"
        :label="'姓名'"
      ></e-table-column>
      <e-table-column :sortable="true" :prop="'date'" :label="'日期'">
        <template #default="record">
          <a-button>{{ record.rowData }}</a-button>
        </template>
      </e-table-column>
    </e-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

import BTable from '@/components/BTable/BTable.vue';
import ETable from '@/components/ETable/ETable.vue';
import ETableColumn from '@/components/ETable/ETableColumn.vue';

import { ColumnsTypes } from '@/components/BTable/interface';

export default defineComponent({
  components: { BTable, ETable, ETableColumn },
  setup() {
    const columns: ColumnsTypes[] = [
      { label: '大小', prop: 'big' },
      { label: '地址', prop: 'address' },
      { label: '姓名', prop: 'name' },
      { label: '日期', prop: 'date', slots: 'detail' },
    ];
    const tableData = reactive([
      {
        big: 10,
        date: '2016-05-02',
        name: '1王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        big: 0,
        date: '2016-05-04',
        name: '2王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
      },
      {
        big: 1,
        date: '2016-05-01',
        name: '4王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
      },
      {
        big: 3,
        date: '2016-05-03',
        name: '3王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      },
    ]);

    return {
      tableData,
      columns,
    };
  },
});
</script>

<style></style>
