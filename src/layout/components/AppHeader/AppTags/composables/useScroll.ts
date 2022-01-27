/** @format */

import OverlayScrollbars from 'overlayscrollbars';
import {
  nextTick, onBeforeUnmount, onMounted, ref, watch,
} from 'vue';
import { useRoute } from 'vue-router';

export default function useScroll(): void {
  const route = useRoute();

  const scroll = ref();

  const setScrollBar = () => {
    scroll.value = OverlayScrollbars(
      document.querySelectorAll('.app-tags-container'),
      {
        scrollbars: {
          autoHide: 'leave',
          visibility: 'auto',
        },
        overflowBehavior: {
          y: 'hidden',
        },
      },
    );
  };

  const moveToCurrentTag = (): void => {
    nextTick(() => {
      if (scroll.value) {
        scroll.value.scroll(document.querySelector('.tag-active'));
      }
    });
  };

  watch(route, () => {
    moveToCurrentTag();
  });

  onMounted(setScrollBar);

  onBeforeUnmount(() => {
    scroll.value.destroy();
    scroll.value = null;
  });
}
