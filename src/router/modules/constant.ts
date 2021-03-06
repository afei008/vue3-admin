/** @format */

import { RouteRecordRaw } from 'vue-router';

import nestedRoutes from './nested';
import singleRoutes from './single';
import dashboardRoutes from './dashboard';
import componentsRoutes from './components';
import tableRoutes from './table';
import permissionRoutes from './permission';
import amapRoutes from './amapRoutes';

const routes: Array<RouteRecordRaw> = [
  ...singleRoutes,
  ...dashboardRoutes,
  ...componentsRoutes,
  ...tableRoutes,
  ...permissionRoutes,
  ...nestedRoutes,
  ...amapRoutes,
  // {
  //   path: '/vue-app',
  //   redirect: '/vue-app/index',
  //   component: () => import('@/layout/index.vue'),
  //   meta: { title: '子应用', hidden: true },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'VueApp',
  //       component: () => import('@/views/sub-app/vue-app.vue'),
  //       meta: { title: 'vue子应用' },
  //     },
  //   ],
  // },
  // {
  //   path: '/vue-app/index:pathMatch(.*)*',
  //   redirect: '/vue-app/index',
  // },
];

export default routes;
