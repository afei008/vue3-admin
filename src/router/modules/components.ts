/** @format */

import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/components',
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
        path: 'dynamic-form',
        name: 'DynamicForm',
        component: () => import('@/views/components/dynamic-form.vue'),
        meta: { title: '动态表单' },
      },
      {
        path: 'custom-table',
        name: 'CustomTable',
        component: () => import('@/views/components/custom-table.vue'),
        meta: { title: '自定义表格' },
      },
    ],
  },
  {
    path: '/components/dynamic-form:pathMatch(.*)*',
    redirect: '/components/dynamic-form',
  },
  {
    path: '/components/custom-table:pathMatch(.*)*',
    redirect: '/components/custom-table',
  },
];

export default routes;
