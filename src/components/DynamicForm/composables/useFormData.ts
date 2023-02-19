/** @format */

import { reactive } from 'vue';

/* eslint-disable @typescript-eslint/no-explicit-any */
const state = reactive({
  data: {} as Record<string, any>,
  setData(data: Record<string, any>) {
    state.data = data;
  },
  changeData(k: string, v: any) {
    state.data[k] = v;
  },
});

export default state;
