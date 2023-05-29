/** @format */

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import api from './api';

import useTable from './init/vxe-table';
import useAntd from './init/antd';

import 'overlayscrollbars/overlayscrollbars.css';
import './styles/index.scss';

import './permission';
import permission from './directive/permission';

import mockXHR from './mock';

mockXHR();

const app = createApp(App);
app.config.globalProperties.$api = api;

app
  .use(createPinia())
  .use(router)
  .use(useTable)
  .use(useAntd)
  .directive('permission', permission);

app.mount('#app');
