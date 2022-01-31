/** @format */

import {
  nextTick, onBeforeUnmount, onMounted, watch,
} from 'vue';
import { useRoute } from 'vue-router';
import useScrollbars from '@/composables/useScrollbars';

export default function useScroll(): void {
  const route = useRoute();

  const { scrollbars, initScrollbars } = useScrollbars({
    el: '.app-tags-container',
    y: 'hidden',
  });

  const moveToCurrentTag = (): void => {
    nextTick(() => {
      if (scrollbars.value) {
        scrollbars.value.scroll(
          document.querySelector('.tag-active') as HTMLElement,
        );
      }
    });
  };

  watch(route, () => {
    moveToCurrentTag();
  });

  onMounted(() => {
    initScrollbars.value();
  });

  onBeforeUnmount(() => {
    scrollbars.value?.destroy();
    scrollbars.value = undefined;
  });
}
