/** @format */

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import useTable from './init/vxe-table';

import 'element-plus/theme-chalk/src/message.scss';
import 'overlayscrollbars/overlayscrollbars.css';
import './styles/index.scss';

import './permission';
import permission from './directive/permission';

import mockXHR from './mock';

mockXHR();

const app = createApp(App);

app
  .use(createPinia())
  .use(router)
  .use(useTable)
  .directive('permission', permission);

app.mount('#app');
