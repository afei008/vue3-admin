/** @format */

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import RootApp from '@/RootApp.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: window.__MICRO_APP_BASE_ROUTE__ || '/',
    component: RootApp,
    children: [
      // 其他的路由都写到这里
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { title: '首页', sort: 1 },
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/Table.vue'),
        meta: { title: '表格', sort: 2 },
      },
      {
        path: 'form',
        name: 'Form',
        component: () => import('@/views/Form.vue'),
        meta: { title: '表单', sort: 3 },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
