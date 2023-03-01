/** @format */

import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/d3',
    redirect: '/d3/histogram',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: 'D3',
      icon: 'icon-linechart',
    },
    children: [
      {
        path: 'histogram',
        name: 'D3Histogram',
        component: () => import('@/views/d3/views/histogram/index.vue'),
        meta: { title: '直方图' },
      },
      {
        path: 'scatter-plot',
        name: 'D3ScatterPlot',
        component: () => import('@/views/d3/views/scatter-plot/index.vue'),
        meta: { title: '散点图' },
      },
      {
        path: 'line-chart',
        name: 'D3LineChart',
        component: () => import('@/views/d3/views/line-chart/index.vue'),
        meta: { title: '折线图' },
      },
      {
        path: 'area-chart',
        name: 'D3AreaChart',
        component: () => import('@/views/d3/views/area-chart/index.vue'),
        meta: { title: '面积图' },
      },
      {
        path: 'pie-chart',
        name: 'D3PieChart',
        component: () => import('@/views/d3/views/pie-chart/index.vue'),
        meta: { title: '饼图' },
      },
      {
        path: 'radar-chart',
        name: 'D3RadarChart',
        component: () => import('@/views/d3/views/radar-chart/index.vue'),
        meta: { title: '雷达图' },
      },
    ],
  },
];

export default routes;
