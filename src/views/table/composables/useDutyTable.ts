/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, ref, type ComputedRef } from 'vue';
import type { VxeTablePropTypes } from 'vxe-table';

interface BaseTableTypes {
  gridOptions: ComputedRef<Record<string, any>>;
}

export default function useBaseTable(
  tableData: Record<string, any>
): BaseTableTypes {
  const columns = ref([
    { type: 'checkbox', width: 50 },
    { type: 'seq', width: 50 },
    { field: 'level1Proportion', title: '一级职责清单及权重占比' },
    { field: 'level2Proportion', title: '二级职责清单及权重占比' },
    {
      field: 'level3Table',
      title: '三级职责清单',
      editRender: { name: 'input' },
    },
    { field: 'level3Request', title: '三级职责清单履职要求' },
    {
      field: 'label',
      title: '职责标签',
      width: 300,
      slots: { default: 'label' },
    },
    {
      field: 'basis',
      title: '履职依据',
      width: 300,
      slots: { default: 'basis' },
    },
    { field: 'level', title: '责任等级' },
    { field: 'function', title: '评价方法' },
  ]);

  const mergeCells = [
    {
      row: 0,
      col: 2,
      rowspan: 10,
      colspan: 0,
    },
    {
      row: 0,
      col: 3,
      rowspan: 10,
      colspan: 0,
    },
    {
      row: 0,
      col: 4,
      rowspan: 2,
      colspan: 0,
    },
    {
      row: 2,
      col: 4,
      rowspan: 3,
      colspan: 0,
    },
    {
      row: 5,
      col: 4,
      rowspan: 3,
      colspan: 0,
    },
    {
      row: 0,
      col: 7,
      rowspan: 10,
      colspan: 0,
    },
    {
      row: 0,
      col: 8,
      rowspan: 4,
      colspan: 0,
    },
  ] as VxeTablePropTypes.MergeCells;

  const gridOptions = computed(() => ({
    border: true,
    columns: columns.value,
    data: tableData.value,
    mergeCells,
    mouseConfig: { selected: true },
    keyboardConfig: {
      isArrow: true,
      isEnter: true,
    },
    editConfig: {
      trigger: 'click',
      mode: 'cell',
      showStatus: true,
    },
  }));

  return {
    gridOptions,
  };
}
