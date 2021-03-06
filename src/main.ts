/** @format */

import { createApp } from 'vue';
import microApp from '@micro-zoe/micro-app';
import app from './App.vue';
import router from './router';
import store, { key } from './store';
import api from './api';

import './permission';
import permission from './directive/permission';

import useTable from './init/vxe-table';
import useAntd from './init/antd';

import 'overlayscrollbars/css/OverlayScrollbars.css';
import './style/index.scss';

import mockXHR from './mock';

microApp.start();

if (process.env.NODE_ENV === 'mock' || process.env.NODE_ENV === 'production') {
  mockXHR();
}

const APP = createApp(app);
APP.config.globalProperties.$api = api;

APP.use(store, key)
  .use(router)
  .use(useTable)
  .use(useAntd)
  .directive('permission', permission)
  .mount('#app');
