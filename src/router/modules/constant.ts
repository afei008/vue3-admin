/** @format */

import { RouteRecordRaw } from 'vue-router';

import nestedRoutes from './nested';
import singleRoutes from './single';
import dashboardRoutes from './dashboard';
import componentsRoutes from './components';
import tableRoutes from './table';
import permissionRoutes from './permission';

const routes: Array<RouteRecordRaw> = [
  ...singleRoutes,
  ...dashboardRoutes,
  ...componentsRoutes,
  ...tableRoutes,
  ...permissionRoutes,
  ...nestedRoutes,
];

export default routes;
