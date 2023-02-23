/** @format */

import { reactive } from 'vue';

const state = reactive({
  data: {} as Record<string, unknown>,
  setData(data: Record<string, unknown>) {
    state.data = data;
  },
  changeData(k: string, v: unknown) {
    state.data[k] = v;
  },
});

export default state;
