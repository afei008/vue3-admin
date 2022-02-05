/** @format */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/form',
    redirect: '/components/tinymce',
    component: () => import('@/layout/index.vue'),
    meta: { title: '组件', icon: 'icon-appstoreadd' },
    children: [
      {
        path: 'tinymce',
        name: 'Tinymce',
        component: () => import('@/views/components/tinymce.vue'),
        meta: { title: '富文本编辑器' },
      },
      {
        path: 'clipboard',
        name: 'Clipboard',
        component: () => import('@/views/components/clipboard.vue'),
        meta: { title: '剪贴板' },
      },
      {
        path: 'advanced-form',
        name: 'AdvancedForm',
        component: () => import('@/views/components/advanced-form.vue'),
        meta: { title: '高级表单' },
      },
    ],
  },
];

export default routes;
