/** @format */

import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    redirect: '/dashboard/workplace',
    component: () => import('@/layout/index.vue'),
    meta: { title: '仪表盘', icon: 'icon-dashboard' },
    children: [
      {
        path: 'workplace',
        name: 'Workplace',
        component: () => import('@/views/dashboard/workplace/index.vue'),
        meta: { title: '工作台' },
      },
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('@/views/dashboard/analysis/index.vue'),
        meta: { title: '分析页' },
      },
      {
        path: 'https://afei008.github.io/d3/index.html',
        component: () => import('@/layout/index.vue'),
        meta: { title: 'd3' },
      },
    ],
  },
  {
    path: '/dashboard/workplace:pathMatch(.*)*',
    redirect: '/dashboard/workplace',
  },
];

export default routes;
