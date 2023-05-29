/** @format */

import type { RouteRecordRaw } from 'vue-router';

import nestedRoutes from './nested';
import singleRoutes from './single';
import dashboardRoutes from './dashboard';
import componentsRoutes from './components';
import tableRoutes from './table';
import permissionRoutes from './permission';
import amapRoutes from './amapRoutes';
import webapiRoutes from './webapiRoutes';
import antvRoutes from './antvRoutes';

const routes: Array<RouteRecordRaw> = [
  ...singleRoutes,
  ...dashboardRoutes,
  ...componentsRoutes,
  ...tableRoutes,
  ...permissionRoutes,
  ...nestedRoutes,
  ...amapRoutes,
  ...webapiRoutes,
  ...antvRoutes,
];

export default routes;
