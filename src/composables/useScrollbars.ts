/** @format */

import { reactive, Ref, toRefs } from 'vue';
import OverlayScrollbars from 'overlayscrollbars';

interface ScrollbarsTypes {
  scrollbars: Ref<OverlayScrollbars | undefined>;
  initScrollbars: Ref<() => void>;
}

export const state = reactive({
  scrollbars: undefined as OverlayScrollbars | undefined,
  backTop() {
    if (state.scrollbars && state?.scrollbars?.scroll) {
      state.scrollbars.scroll({ y: 0 }, 300);
    }
  },
});

export default function useScrollbars(
  options: Record<string, string> = {},
): ScrollbarsTypes {
  const react = reactive({
    scrollbars: undefined as OverlayScrollbars | undefined,
    initScrollbars() {
      const {
        el = 'body', x, y, className,
      } = options;

      let overflowBehavior = {};
      if (x) {
        overflowBehavior = { ...overflowBehavior, x };
      }
      if (y) {
        overflowBehavior = { ...overflowBehavior, y };
      }

      const cache = OverlayScrollbars(document.querySelectorAll(el), {
        className,
        scrollbars: {
          autoHide: 'leave',
          visibility: 'auto',
        },
        overflowBehavior,
      }) as OverlayScrollbars;

      if (el === 'body') {
        state.scrollbars = cache;
      } else {
        react.scrollbars = cache;
      }
    },
  });

  return {
    ...toRefs(react),
  };
}
