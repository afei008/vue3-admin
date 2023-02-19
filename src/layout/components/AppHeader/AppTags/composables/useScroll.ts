/** @format */

import { nextTick, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useOverlayScrollbars } from 'overlayscrollbars-vue';

export default function useScroll(): void {
  const route = useRoute();
  const [initialize, instance] = useOverlayScrollbars({
    options: {
      scrollbars: {
        autoHide: 'leave',
      },
      overflow: {
        y: 'hidden',
      },
    },
  });

  const moveToCurrentTag = (): void => {
    nextTick(() => {
      const osInstance = instance();
      if (osInstance?.elements) {
        const { viewport } = osInstance.elements();
        const tagActive = document.querySelector('.tag-active') as HTMLElement;
        const left = tagActive.getBoundingClientRect().left - 220;
        viewport.scrollTo({ left });
      }
    });
  };

  watch(route, () => {
    moveToCurrentTag();
  });

  onMounted(() => {
    initialize({
      target: document.querySelector('.app-tags-container') as HTMLElement,
    });
  });
}
