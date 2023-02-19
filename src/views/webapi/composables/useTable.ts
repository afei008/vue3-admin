/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, type ComputedRef, ref } from 'vue';

interface BaseTableTypes {
  gridOptions: ComputedRef<Record<string, any>>;
}

export default function useBaseTable(
  tableData: Record<string, any>
): BaseTableTypes {
  const columns = ref([
    { type: 'seq', width: 50 },
    { field: 'sn', title: 'sn码' },
    { field: 'name', title: '姓名' },
    { field: 'age', title: '年龄' },
    { field: 'email', title: '邮箱' },
    { field: 'handle', title: '操作', slots: { default: 'handle' } },
  ]);

  const gridOptions = computed(() => ({
    border: true,
    columns: columns.value,
    data: tableData.value,
  }));

  return {
    gridOptions,
  };
}
