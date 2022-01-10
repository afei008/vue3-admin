/** @format */

import { App, createApp } from 'vue';

import XEUtils from 'xe-utils';
import {
  VXETable, Header, Column, Table, Grid,
} from 'vxe-table';
import 'vxe-table/lib/style.css';
import zhCN from 'vxe-table/lib/locale/lang/zh-CN';

import {
  ConfigProvider,
  Button,
  DatePicker,
  Radio,
} from 'ant-design-vue';

import app from './App.vue';
import router from './router';
import store from './store';

VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args),
});
function useTable(appli: App) {
  appli.use(Header).use(Column).use(Table).use(Grid);
}

function useAntd(appli: App) {
  appli
    .use(ConfigProvider)
    .use(Button)
    .use(DatePicker)
    .use(Radio);
}

createApp(app).use(store).use(router).use(useTable)
  .use(useAntd)
  .mount('#app');
