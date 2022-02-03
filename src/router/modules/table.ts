/** @format */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/table',
    redirect: '/table/base-table',
    component: () => import('@/layout/index.vue'),
    meta: { title: '表格页', icon: 'icon-table' },
    children: [
      {
        path: 'base-table',
        name: 'BaseTable',
        component: () => import('@/views/table/base-table.vue'),
        meta: { title: '基础表格' },
      },
      {
        path: 'drag-table',
        name: 'DragTable',
        component: () => import('@/views/table/drag-table.vue'),
        meta: { title: '拖动表格' },
      },
      {
        path: 'advanced-table',
        name: 'AdvancedTable',
        component: () => import('@/views/table/advanced-table.vue'),
        meta: { title: '综合表格' },
      },
    ],
  },
];

export default routes;
