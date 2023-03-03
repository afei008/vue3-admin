<!-- @format -->

<template>
  <div>
    <vxe-grid ref="gridRef" v-bind="gridOptions" :loading="isLoading">
      <template #dragBtn>
        <span class="drag-btn">
          <el-icon><rank /></el-icon>
        </span>
      </template>
      <template #dragTip>
        <el-tooltip placement="top">
          <template #content>
            <span>按住后表头和首航可拖动</span>
          </template>
          <el-icon><warning /></el-icon>
        </el-tooltip>
      </template>
      <template #operator="{ row }">
        <span>{{ row.operator }}</span>
      </template>
      <template #handle="{ row }">
        <el-button type="primary" @click="clickSetting(row.id)">
          订阅报警
        </el-button>
      </template>
      <template #pager>
        <vxe-pager
          v-model:current-page="page.currentPage"
          v-model:page-size="page.pageSize"
          background
          :total="page.totalResult"
          :layouts="page.layouts"
          @page-change="page.pageChange"
        />
      </template>
    </vxe-grid>

    <p>行id--{{ gridOptions?.data?.map((item: any) => item.id) }}</p>
    <p>列名称--{{ currentColumns?.map((item: any) => item.field) }}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Rank, Warning } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import useArticle from './composables/useArticle';
import useDragTable from './composables/useDragTable';
import usePager from './composables/usePager';

export default defineComponent({
  name: 'DragTable',
  components: {
    Rank,
    Warning,
  },
  setup() {
    const params = ref({
      pageNum: 1,
      pageSize: 10,
    });

    const changeParams = (pages: Record<string, number>) => {
      params.value.pageNum = pages.pageNum;
      params.value.pageSize = pages.pageSize;
    };

    const { isLoading, articleList, pages } = useArticle(params);

    const { gridRef, gridOptions, currentColumns } = useDragTable(articleList);

    const { page } = usePager(pages, changeParams);

    const clickSetting = (id: number) => {
      ElMessage({
        message: `订阅成功${id}`,
        type: 'success',
      });
    };

    return {
      isLoading,
      gridRef,
      gridOptions,
      currentColumns,
      page,
      clickSetting,
    };
  },
});
</script>
<style lang="scss" scoped>
/* stylelint-disable selector-class-pattern */
:deep(.sortable-demo) {
  .drag-btn {
    cursor: move;
  }

  .vxe-body--row.sortable-ghost,
  .vxe-body--row.sortable-chosen {
    background-color: #dfecfb;
  }

  .vxe-header--row .vxe-header--column.sortable-ghost,
  .vxe-header--row .vxe-header--column.sortable-chosen {
    background-color: #dfecfb;
  }

  .vxe-header--row .vxe-header--column.col--fixed {
    cursor: no-drop;
  }
}
</style>
