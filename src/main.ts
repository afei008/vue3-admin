/** @format */

import { App, createApp } from 'vue';
import 'overlayscrollbars/css/OverlayScrollbars.css'

import XEUtils from 'xe-utils';
import {
  VXETable, Header, Column, Table, Grid,
} from 'vxe-table';
import 'vxe-table/lib/style.css';
import zhCN from 'vxe-table/lib/locale/lang/zh-CN';

import {
  ConfigProvider, Button, DatePicker, Radio, Layout, Menu, Breadcrumb, Row, Col,
} from 'ant-design-vue';

import app from './App.vue';
import router from './router';
import store, { key } from './store';

VXETable.setup({
  i18n: (vxekey, args) => XEUtils.toFormatString(XEUtils.get(zhCN, vxekey), args),
});
function useTable(appli: App) {
  appli.use(Header).use(Column).use(Table).use(Grid);
}

function useAntd(appli: App) {
  appli.use(ConfigProvider).use(Button).use(DatePicker).use(Radio)
    .use(Layout)
    .use(Menu)
    .use(Breadcrumb)
    .use(Row)
    .use(Col);
}

createApp(app)
  .use(store, key)
  .use(router)
  .use(useTable)
  .use(useAntd)
  .mount('#app');
