/** @format */

import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth-test',
    name: 'AuthTest',
    redirect: '/auth/no-auth',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '权限测试',
      icon: 'icon-unlock',
      roles: ['admin', 'editor'],
    },
    children: [
      {
        path: 'no-auth',
        name: 'NoAuth',
        component: () => import('@/views/auth-test/no-auth.vue'),
        meta: { title: '无限制' },
      },
      {
        path: 'admin-auth',
        name: 'AdminAuth',
        component: () => import('@/views/auth-test/admin-auth.vue'),
        meta: { title: '管理员', roles: ['admin'] },
      },
    ],
  },
];

export default routes;
