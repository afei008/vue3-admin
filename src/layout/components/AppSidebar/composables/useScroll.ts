/** @format */

import { onMounted } from 'vue';
import OverlayScrollbars from 'overlayscrollbars';

export default function useScroll(): void {
  const setScrollBar = () => {
    OverlayScrollbars(document.querySelectorAll('.app-menu'), {
      className: 'os-theme-light',
      scrollbars: {
        autoHide: 'leave',
        visibility: 'auto',
      },
      overflowBehavior: {
        x: 'hidden',
      },
    });
  };

  onMounted(setScrollBar);
}
