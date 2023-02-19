/** @format */

import { reactive } from 'vue';

const state = reactive({
  collapsed: false,
  changeCollapsed() {
    state.collapsed = !state.collapsed;
  },
});

export default state;
