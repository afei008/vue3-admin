/** @format */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Layout from '@/layout/index.vue';

const routes = [
  {
    path: '/table',
    redirect: '/table/base-table',
    component: Layout,
    meta: { title: '表格页' },
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
        meta: { title: '高级表格' },
      },
    ],
  },
];

export default routes;
