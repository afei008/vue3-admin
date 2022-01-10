<!-- @format -->

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <vxe-table border :data="tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name">
        <template #default="{ row }">
          <span>自定义插槽模板 {{ row.name }}</span>
        </template>
      </vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
    </vxe-table>

    <vxe-grid v-bind="gridOptions">
      <template #name="{ row }">
        <span>自定义插槽模板 {{ row.name }}</span>
      </template>
    </vxe-grid>

    <a-button type="primary">Primary Button</a-button>
     <a-date-picker v-model:value="value1" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import type { Dayjs } from 'dayjs';

export default defineComponent({
  setup() {
    const tableData = ref([
      {
        id: 10001,
        name: 'Test1',
        role: 'Develop',
        sex: 'Man',
        age: 28,
        address: 'test abc',
      },
      {
        id: 10002,
        name: 'Test2',
        role: 'Test',
        sex: 'Women',
        age: 22,
        address: 'Guangzhou',
      },
      {
        id: 10003,
        name: 'Test3',
        role: 'PM',
        sex: 'Man',
        age: 32,
        address: 'Shanghai',
      },
      {
        id: 10004,
        name: 'Test4',
        role: 'Designer',
        sex: 'Women',
        age: 24,
        address: 'Shanghai',
      },
    ]);

    const gridOptions = reactive({
      border: true,
      columns: [
        { type: 'seq', width: 50 },
        { field: 'name', title: 'Name', slots: { default: 'name' } },
        { field: 'sex', title: 'Sex', showHeaderOverflow: true },
        { field: 'address', title: 'Address', showOverflow: true },
      ],
      data: [
        {
          id: 10001,
          name: 'Test1',
          role: 'Develop',
          sex: 'Man',
          age: 28,
          address: 'test abc',
        },
        {
          id: 10002,
          name: 'Test2',
          role: 'Test',
          sex: 'Women',
          age: 22,
          address: 'Guangzhou',
        },
        {
          id: 10003,
          name: 'Test3',
          role: 'PM',
          sex: 'Man',
          age: 32,
          address: 'Shanghai',
        },
        {
          id: 10004,
          name: 'Test4',
          role: 'Designer',
          sex: 'Women',
          age: 24,
          address: 'Shanghai',
        },
      ],
    });

    const value1 = ref<Dayjs>();

    return {
      tableData,
      gridOptions,
      value1,
    };
  },
});
</script>
