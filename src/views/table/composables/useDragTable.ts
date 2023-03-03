/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  computed,
  nextTick,
  onUnmounted,
  ref,
  type Ref,
  type ComputedRef,
} from 'vue';
import type { VxeGridInstance } from 'vxe-table';
import XEUtils from 'xe-utils';
import Sortable from 'sortablejs';
import { ElMessage } from 'element-plus';

interface DragTableTypes {
  gridRef: Ref<VxeGridInstance>;
  gridOptions: ComputedRef<Record<string, any>>;
  currentColumns: Ref<any>;
}

export default function useDragTable(
  tableData: Record<string, any>
): DragTableTypes {
  const gridRef = ref({} as VxeGridInstance);

  const columns = ref([
    {
      width: 60,
      slots: { default: 'dragBtn', header: 'dragTip' },
    },
    { type: 'checkbox', width: 50 },
    { type: 'seq', width: 50 },
    { field: 'describe', title: '描述' },
    { field: 'pageviews', title: '浏览量' },
    { field: 'statusStr', title: '状态' },
    { field: 'updateTime', title: '更新时间' },
    {
      field: 'operator',
      title: '操作人',
      slots: { default: 'operator' },
    },
    {
      field: 'handle',
      title: '操作',
      slots: { default: 'handle' },
    },
  ]);

  const gridOptions = computed(() => ({
    border: true,
    rowKey: true,
    columnKey: true,
    class: 'sortable-demo',
    treeConfig: {
      children: 'children',
    },
    columns: columns.value,
    data: tableData.value,
  }));

  const currentColumns = ref<any>(gridOptions.value.columns);

  let sortableRow: any;
  let sortableColumn: any;

  const rowDrag = () => {
    const $grid = gridRef.value;
    sortableRow = Sortable.create(
      $grid.$el.querySelector(
        '.body--wrapper > .vxe-table--body tbody'
      ) as HTMLElement,
      {
        handle: '.drag-btn',
        onEnd(sortableEvent: any) {
          const targetTrEl = sortableEvent.item;
          const oldIndex = sortableEvent.oldIndex as number;
          const options = { children: 'children' };
          const wrapperEl = targetTrEl.parentNode as HTMLElement;
          const prevTrEl = targetTrEl.previousElementSibling as HTMLElement;
          const tableTreeData = gridOptions.value.data as any[];
          const targetRowNode = $grid.getRowNode(targetTrEl);
          if (!targetRowNode) {
            return;
          }
          const selfRow = targetRowNode.item;
          const selfNode = XEUtils.findTree(
            tableTreeData,
            (row) => row === selfRow,
            options
          );
          if (prevTrEl) {
            // 移动到节点
            const prevRowNode = $grid.getRowNode(prevTrEl);
            if (!prevRowNode) {
              return;
            }
            const prevRow = prevRowNode.item;
            const prevNode = XEUtils.findTree(
              tableTreeData,
              (row) => row === prevRow,
              options
            );
            if (
              XEUtils.findTree(
                selfRow[options.children],
                (row) => prevRow === row,
                options
              )
            ) {
              // 错误的移动
              const oldTrElem = wrapperEl.children[oldIndex];
              wrapperEl.insertBefore(targetTrEl, oldTrElem);
              ElMessage({
                message: '不允许自己给自己拖动',
                type: 'error',
              });
            }
            const currRow = selfNode.items.splice(selfNode.index, 1)[0];
            if ($grid.isTreeExpandByRow(prevRow)) {
              // 移动到当前的子节点
              prevRow[options.children].splice(0, 0, currRow);
            } else {
              // 移动到相邻节点
              prevNode.items.splice(
                prevNode.index + (selfNode.index < prevNode.index ? 0 : 1),
                0,
                currRow
              );
            }
          } else {
            // 移动到第一行
            const currRow = selfNode.items.splice(selfNode.index, 1)[0];
            tableTreeData.unshift(currRow);
          }
          // 如果变动了树层级，需要刷新数据
          // gridOptions.value.data = [...tableTreeData];
        },
      }
    );
  };

  function insertAfter(el: HTMLElement, target: Node) {
    const { parentNode } = target;
    if (parentNode?.lastChild === target) {
      parentNode.appendChild(el);
    } else if (target.nextSibling) {
      parentNode?.insertBefore(el, target?.nextSibling);
    } else {
      throw new Error('error');
    }
  }

  const columnDrag = () => {
    const $grid = gridRef.value;
    sortableColumn = Sortable.create(
      $grid.$el.querySelector(
        '.body--wrapper > .vxe-table--header .vxe-header--row'
      ),
      {
        handle: '.vxe-header--column:not(.col--fixed)',
        onEnd(sortableEvent: any) {
          const targetThEl = sortableEvent.item;
          const newIndex = sortableEvent.newIndex as number;
          const oldIndex = sortableEvent.oldIndex as number;
          const { fullColumn, tableColumn } = $grid.getTableColumn();
          const wrapperEl = targetThEl.parentNode as HTMLElement;
          const newColumn = fullColumn[newIndex];
          if (newColumn.fixed) {
            // 错误的移动
            const oldThEl = wrapperEl.children[oldIndex] as HTMLElement;
            if (newIndex > oldIndex) {
              wrapperEl.insertBefore(targetThEl, oldThEl);
            } else {
              insertAfter(targetThEl, oldThEl);
            }
            return ElMessage({ message: '固定列不允许拖动', type: 'error' });
          }
          // 转换真实索引
          const oldColumnIndex = $grid.getColumnIndex(tableColumn[oldIndex]);
          const newColumnIndex = $grid.getColumnIndex(tableColumn[newIndex]);
          // 移动到目标列
          const currRow = fullColumn.splice(oldColumnIndex, 1)[0];
          fullColumn.splice(newColumnIndex, 0, currRow);
          $grid.loadColumn(fullColumn);
          currentColumns.value = fullColumn;
          return undefined;
        },
      }
    );
  };

  let initTime: any;
  nextTick(() => {
    initTime = setTimeout(() => {
      rowDrag();
      columnDrag();
    }, 500);
  });

  onUnmounted(() => {
    clearTimeout(initTime);
    if (sortableRow) {
      sortableRow.destroy();
    }
    if (sortableColumn) {
      sortableColumn.destroy();
    }
  });

  return {
    gridRef,
    gridOptions,
    currentColumns,
  };
}
