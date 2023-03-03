/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { onMounted, reactive, watch, toRefs, type Ref } from 'vue';
import API from '@/api';

interface ArticleTypes {
  isLoading: Ref<boolean>;
  articleList: Record<string, any>;
  pages: Ref<any>;
  getArticleList: () => void;
}

export default function useArticle(params: Record<string, any>): ArticleTypes {
  const state = reactive({
    isLoading: false,
    articleList: [],
    pages: {
      pageNum: 1,
      pageSize: 10,
      total: 0,
    },
  });

  const getArticleList = async () => {
    state.isLoading = true;
    const res = await API.articleList(params.value);
    state.articleList = res.data.records;
    state.pages.total = res.data.total;
    state.isLoading = false;
  };

  watch(
    params,
    () => {
      state.pages.pageNum = params.value.pageNum;
      state.pages.pageSize = params.value.pageSize;
      getArticleList();
    },
    { deep: true }
  );

  onMounted(getArticleList);

  return {
    ...toRefs(state),
    getArticleList,
  };
}
