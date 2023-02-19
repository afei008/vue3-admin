/** @format */

import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/webapi',
    name: 'Webapi',
    redirect: '/webapi/indexedDB',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: 'Webapi',
      icon: 'icon-codepen',
    },
    children: [
      {
        path: 'indexedDB',
        name: 'IndexedDB',
        component: () => import('@/views/webapi/indexedDB.vue'),
        meta: { title: 'IndexedDB' },
      },
    ],
  },
];

export default routes;
