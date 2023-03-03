/** @format */

import { reactive, watch, type Ref } from 'vue';

interface PagerTypes {
  page: Record<string, any>;
}

interface PageChangeTypes {
  type: string;
  currentPage: number;
  pageSize: number;
}

type Cb = (params: Record<string, number>) => void;

export default function usePager(pages: Ref, callback?: Cb): PagerTypes {
  const page = reactive({
    currentPage: 1,
    pageSize: 10,
    totalResult: 0,
    pageSizes: [10, 15, 20, 50, 100, 10000],
    layouts: [
      'PrevJump',
      'PrevPage',
      'JumpNumber',
      'NextPage',
      'NextJump',
      'Sizes',
      'FullJump',
      'Total',
    ],
    pageChange: ({ type, currentPage, pageSize }: PageChangeTypes): void => {
      page.currentPage = type === 'size' ? 1 : currentPage;
      page.pageSize = pageSize;
      if (callback) {
        callback({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          isPageChange: 1,
        });
      }
    },
  });

  watch(
    pages,
    (nv) => {
      page.currentPage = nv.pageNum;
      page.pageSize = nv.pageSize;
      page.totalResult = nv.total;
    },
    { deep: true }
  );

  return {
    page,
  };
}
