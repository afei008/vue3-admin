/** @format */

import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/amap',
    redirect: '/amap/index',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '地图',
      icon: 'icon-location',
    },
    children: [
      {
        path: 'index',
        name: 'Amap',
        component: () => import('@/views/amap/index.vue'),
        meta: { title: '高德地图' },
      },
    ],
  },
];

export default routes;
