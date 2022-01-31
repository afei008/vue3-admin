/** @format */

import { reactive } from 'vue';
import { state } from '@/composables/useScrollbars';

interface PagerTypes {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  page: Record<string, any>;
}

interface PageChangeTypes {
  type: string;
  currentPage: number;
  pageSize: number;
}

export default function usePager(pages: Record<string, number>): PagerTypes {
  const page = reactive({
    currentPage: pages.pageNum,
    pageSize: pages.pageSize,
    totalResult: 100,
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

      state.backTop();
    },
  });

  return {
    page,
  };
}
