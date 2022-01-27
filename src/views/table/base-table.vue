<!-- @format -->

<template>
  <div>
    <vxe-grid v-bind="gridOptions">
      <template #name="{ row }">
        <span>自定义插槽模板 {{ row.name }}</span>
      </template>
    </vxe-grid>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'BaseTable',
  setup() {
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

    return {
      gridOptions,
    };
  },
});
</script>
