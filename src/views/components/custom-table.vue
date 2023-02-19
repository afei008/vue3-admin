<!-- @format -->

<template>
  <h1>类似 antd 表格的传参方式</h1>
  <b-table :data="tableData" :columns="columns">
    <template #detail="record">
      <a-button>{{ record.rowData }}</a-button>
    </template>
  </b-table>
  <h1>类似 element-ui 表格的传参方式</h1>
  <e-table :data="tableData">
    <e-table-column :sortable="true" :prop="'big'" :label="'大小'" />
    <e-table-column :sortable="true" :prop="'address'" :label="'地址'" />
    <e-table-column :sortable="true" :prop="'name'" :label="'姓名'" />
    <e-table-column :sortable="true" :prop="'date'" :label="'日期'">
      <template #default="record">
        <a-button>{{ record.rowData }}</a-button>
      </template>
    </e-table-column>
  </e-table>
  <right-panel child-route-name="Table" />
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

import BTable from '@/components/BTable/BTable.vue';
import ETable from '@/components/ETable/ETable.vue';
import ETableColumn from '@/components/ETable/ETableColumn.vue';
import RightPanel from '@/components/RightPanel/index.vue';

import type { ColumnsTypes } from '@/components/BTable/interface';

export default defineComponent({
  components: {
    BTable,
    ETable,
    ETableColumn,
    RightPanel,
  },
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
