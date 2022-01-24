/** @format */

import { RouteRecordRaw } from 'vue-router';

import nestedRoutes from './nested';
import singleRoutes from './single';
import dashboardRoutes from './dashboard';
import formRoutes from './form';
import tableRoutes from './table';
import permissionRoutes from './permission';

const routes: Array<RouteRecordRaw> = [
  ...singleRoutes,
  ...dashboardRoutes,
  ...formRoutes,
  ...tableRoutes,
  ...permissionRoutes,
  ...nestedRoutes,
  { path: '/:pathMatch(.*)*', redirect: '/404', meta: { hidden: true } },
];

export default routes;
