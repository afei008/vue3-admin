<!-- @format -->

<template>
  <a-spin :spinning="isLoading">
    <vxe-grid ref="gridRef" v-bind="gridOptions">
      <template #dragBtn>
        <span class="drag-btn">
          <drag-outlined />
        </span>
      </template>
      <template #dragTip>
        <a-tooltip placement="top">
          <template #title>
            <span>按住后表头和首航可拖动</span>
          </template>
          <question-circle-outlined />
        </a-tooltip>
      </template>
      <template #operator="{ row }">
        <span>{{ row.operator }}</span>
      </template>
      <template #handle="{ row }">
        <a-button type="primary" @click="clickSetting(row.id)">
          订阅报警
        </a-button>
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
  </a-spin>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { DragOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import 'ant-design-vue/es/message/style/index';
import useArticle from './composables/useArticle';
import useDragTable from './composables/useDragTable';
import usePager from './composables/usePager';

export default defineComponent({
  name: 'DragTable',
  components: {
    DragOutlined,
    QuestionCircleOutlined,
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
      message.info(`订阅成功${id}`);
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
