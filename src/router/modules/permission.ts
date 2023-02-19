/** @format */

import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/permission',
    redirect: '/permission/page-permission',
    component: () => import('@/layout/index.vue'),
    meta: { title: '权限配置', icon: 'icon-lock' },
    children: [
      {
        path: 'page-permission',
        name: 'PagePermission',
        component: () => import('@/views/permission/page-permission.vue'),
        meta: { title: '页面权限' },
      },
      {
        path: 'directive-permission',
        name: 'DirectivePermission',
        component: () => import('@/views/permission/directive-permission.vue'),
        meta: { title: '指令权限' },
      },
      {
        path: 'role-permission',
        name: 'RolePermission',
        component: () => import('@/views/permission/role-permission.vue'),
        meta: { title: '角色权限' },
      },
    ],
  },
];

export default routes;
