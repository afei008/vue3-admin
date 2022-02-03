<!-- @format -->

<template>
  <div>
    <a-spin :spinning="isLoading">
      <vxe-grid v-bind="gridOptions">
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
            background
            v-model:current-page="page.currentPage"
            v-model:page-size="page.pageSize"
            :total="page.totalResult"
            @page-change="page.pageChange"
            :layouts="page.layouts"
          >
          </vxe-pager>
        </template>
      </vxe-grid>
    </a-spin>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { message } from 'ant-design-vue';
import useArticle from './composables/useArticle';
import useBaseTable from './composables/useBaseTable';
import usePager from './composables/usePager';

export default defineComponent({
  name: 'BaseTable',
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

    const { gridOptions } = useBaseTable(articleList);

    const { page } = usePager(pages, changeParams);

    const clickSetting = (id: number) => {
      message.info(`订阅成功${id}`);
    };

    return {
      isLoading,
      gridOptions,
      page,
      clickSetting,
    };
  },
});
</script>
