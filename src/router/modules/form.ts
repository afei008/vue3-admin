/** @format */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Layout from '@/layout/index.vue';

const routes = [
  {
    path: '/form',
    redirect: '/form/base-form',
    component: Layout,
    meta: { title: '表单页' },
    children: [
      {
        path: 'base-form',
        name: 'BaseForm',
        component: () => import('@/views/form/base-form.vue'),
        meta: { title: '基础表单' },
      },
      {
        path: 'step-form',
        name: 'StepForm',
        component: () => import('@/views/form/step-form.vue'),
        meta: { title: '分步表单' },
      },
      {
        path: 'advanced-form',
        name: 'AdvancedForm',
        component: () => import('@/views/form/advanced-form.vue'),
        meta: { title: '高级表单' },
      },
    ],
  },
];

export default routes;
