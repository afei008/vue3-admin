/** @format */

import { createRouter, createWebHashHistory } from 'vue-router';

import routes from './modules/constant';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
