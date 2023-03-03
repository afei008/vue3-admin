<!-- @format -->

<template>
  <vxe-grid v-bind="gridOptions" :loading="isLoading">
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
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ElMessage } from 'element-plus';
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
      ElMessage({
        message: `订阅成功${id}`,
        type: 'success',
      });
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
