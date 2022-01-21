/** @format */

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import nestedRoutes from './modules/nested';
import singleRoutes from './modules/single';
import dashboardRoutes from './modules/dashboard';
import formRoutes from './modules/form';
import tableRoutes from './modules/table';
import permissionRoutes from './modules/permission';

export const routes: Array<RouteRecordRaw> = [
  ...singleRoutes,
  ...dashboardRoutes,
  ...formRoutes,
  ...tableRoutes,
  ...permissionRoutes,
  // {
  //   path: '/about',
  //   redirect: '/about/index',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'About',
  //       component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  //       meta: { title: 'About' },
  //     },
  //   ],
  // },
  nestedRoutes,
  { path: '/:pathMatch(.*)*', redirect: '/404', meta: { hidden: true } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
