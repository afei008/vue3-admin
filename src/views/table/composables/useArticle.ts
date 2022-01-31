/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  onMounted, reactive, Ref, watch, toRefs,
} from 'vue';
import useCurrentInstance from '@/composables/useCurrentInstance';

interface ArticleTypes {
  isLoading: Ref<boolean>;
  articleList: Record<string, any>;
  getArticleList: () => void;
}

export default function useArticle(params: Record<string, any>): ArticleTypes {
  const { proxy } = useCurrentInstance();

  const state = reactive({
    isLoading: false,
    articleList: [],
  });

  const getArticleList = async () => {
    state.isLoading = true;
    state.articleList = await proxy.$api.articleList(params);
    state.isLoading = false;
  };

  watch(params, getArticleList);

  onMounted(getArticleList);

  return {
    ...toRefs(state),
    getArticleList,
  };
}
