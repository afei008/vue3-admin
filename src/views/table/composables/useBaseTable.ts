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
    { type: 'checkbox', width: 50 },
    { type: 'seq', width: 50 },
    { field: 'describe', title: '描述' },
    { field: 'pageviews', title: '浏览量' },
    { field: 'statusStr', title: '状态' },
    { field: 'updateTime', title: '更新时间' },
    { field: 'operator', title: '操作人', slots: { default: 'operator' } },
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
