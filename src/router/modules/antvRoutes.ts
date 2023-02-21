/** @format */

import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/antv',
    redirect: '/antv/x6',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: 'Antv',
      icon: 'icon-linechart',
    },
    children: [
      {
        path: 'x6',
        name: 'X6',
        component: () => import('@/views/antv/x6/index.vue'),
        meta: {
          title: 'X6',
        },
      },
    ],
  },
];

export default routes;
