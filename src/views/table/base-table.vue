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
      </vxe-grid>
      <vxe-pager
        background
        v-model:current-page="page.currentPage"
        v-model:page-size="page.pageSize"
        :total="page.totalResult"
        @page-change="page.pageChange"
        :layouts="page.layouts"
      >
      </vxe-pager>
    </a-spin>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { message } from 'ant-design-vue';
import useArticle from './composables/useArticle';
import useBaseTable from './composables/useBaseTable';
import usePager from './composables/usePager';

export default defineComponent({
  name: 'BaseTable',
  setup() {
    const params = reactive({ pageNum: 1, pageSize: 10 });
    const { isLoading, articleList } = useArticle(params);

    const { gridOptions } = useBaseTable(articleList);

    const { page } = usePager(params);

    const refsPage = toRefs(page);
    params.pageNum = refsPage.currentPage;
    params.pageSize = refsPage.pageSize;

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
