/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, reactive, ref, type Ref, type ComputedRef } from 'vue';
import type { VxeGridInstance } from 'vxe-table';

export interface GridCheckeds {
  records: Array<any>;
  pageviews: number;
  checkboxChange: (e: any) => void;
}

interface AdvancedTableTypes {
  gridRef: Ref<VxeGridInstance>;
  gridOptions: ComputedRef<Record<string, any>>;
  changeColumn: (field: string) => void;
  gridCheckeds: GridCheckeds;
}

export default function useAdvancedTable(
  tableData: Record<string, any>
): AdvancedTableTypes {
  const gridRef = ref({} as VxeGridInstance);

  const columns = reactive([
    {
      type: 'checkbox',
      field: 'checkbox',
      width: 50,
      visible: true,
    },
    {
      type: 'seq',
      field: 'seq',
      width: 50,
      visible: true,
    },
    {
      field: 'describe',
      title: '描述',
      filters: [{ data: '' }],
      filterRender: { name: 'FilterInput' },
      visible: true,
    },
    {
      field: 'pageviews',
      title: '浏览量',
      sortable: true,
      filters: [{ data: '' }],
      filterRender: { name: 'FilterContent' },
      visible: true,
    },
    {
      field: 'statusStr',
      title: '状态',
      sortable: true,
      filters: [
        { label: '关闭', value: '关闭' },
        { label: '已上线', value: '已上线' },
        { label: '运行中', value: '运行中' },
        { label: '异常', value: '异常' },
      ],
      visible: true,
    },
    { field: 'updateTime', title: '更新时间', visible: true },
    {
      field: 'operator',
      title: '操作人',
      slots: { default: 'operator' },
      filters: [{ data: '' }],
      filterRender: { name: 'FilterCondition' },
      visible: true,
    },
    {
      field: 'handle',
      title: '操作',
      slots: { default: 'handle' },
      visible: true,
    },
  ]);

  const gridOptions = computed(() => ({
    border: true,
    height: 'auto',
    autoResize: true,
    align: 'center',
    highlightHoverRow: true,
    checkboxConfig: { checkField: 'checked' },
    columnConfig: { resizable: true },
    sortConfig: { trigger: 'cell' },
    columns,
    data: tableData.value,
  }));

  const gridCheckeds = reactive({
    records: [] as any,
    pageviews: 0,
    checkboxChange(e: any): void {
      const { records } = e;
      gridCheckeds.records = records;
      gridCheckeds.pageviews = records.reduce(
        (acc: any, curr: any) => acc + curr.pageviews,
        0
      );
    },
  });

  const changeColumn = (field: string) => {
    const $table = gridRef.value;
    const { fullColumn } = $table.getTableColumn();
    fullColumn.forEach((item: any) => {
      if (field === item.property) {
        // eslint-disable-next-line no-param-reassign
        item.visible = !item.visible;
      }
    });
    $table.refreshColumn();
  };

  return {
    gridRef,
    gridOptions,
    changeColumn,
    gridCheckeds,
  };
}
