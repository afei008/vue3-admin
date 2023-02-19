/** @format */

import { createApp } from 'vue';

import api from '@/api';
import UserStateTypes from '@/store/modules/user';

const app = createApp({});

declare module '@vue/runtime-core' {
  // 声明自己的 store state
  interface State {
    userState: UserStateTypes;
  }

  // 为 `this` 上绑定的属性提供类型声明，this.$store、this.$api 等
  interface ComponentCustomProperties {
    $api: Record<string, any>;
  }
}

app.config.globalProperties.$api = api;
