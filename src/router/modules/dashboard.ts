/** @format */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Layout from '@/layout/index.vue';

const routes = [
  {
    path: '/dashboard',
    redirect: '/dashboard/workplace',
    component: Layout,
    meta: { title: '仪表盘', icon: 'PieChartOutlined' },
    children: [
      {
        path: 'workplace',
        name: 'Workplace',
        component: () => import('@/views/dashboard/workplace.vue'),
        meta: { title: '工作台' },
      },
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('@/views/dashboard/analysis.vue'),
        meta: { title: '分析页' },
      },
      {
        path: 'http://www.baidu.com',
        component: Layout,
        meta: { title: '监控页' },
      },
    ],
  },
];

export default routes;
