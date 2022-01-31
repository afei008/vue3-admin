/** @format */

import { App, createApp } from 'vue';
import 'overlayscrollbars/css/OverlayScrollbars.css';

import XEUtils from 'xe-utils';
import {
  VXETable,
  Header,
  Column,
  Table,
  Grid,
  Pager,
  Select as VxeSelect,
  Input as VxeInput,
} from 'vxe-table';
import 'vxe-table/lib/style.css';
import zhCN from 'vxe-table/lib/locale/lang/zh-CN';

import {
  ConfigProvider,
  Button,
  DatePicker,
  Radio,
  Layout,
  Menu,
  Breadcrumb,
  Row,
  Col,
  Form,
  Input,
  Checkbox,
  Dropdown,
  Divider,
  Modal,
  Tag,
  Spin,
} from 'ant-design-vue';

import mockXHR from './mock';
import api from './api';
import app from './App.vue';
import router from './router';
import store, { key } from './store';
import './permission';
import './style/index.scss';

import permission from './directive/permission';

if (process.env.NODE_ENV === 'mock') {
  mockXHR();
}

VXETable.setup({
  i18n: (vxekey, args) => XEUtils.toFormatString(XEUtils.get(zhCN, vxekey), args),
});
function useTable(appli: App) {
  appli
    .use(Header)
    .use(Column)
    .use(Table)
    .use(Grid)
    .use(Pager)
    .use(VxeInput)
    .use(VxeSelect);
}

function useAntd(appli: App) {
  appli
    .use(ConfigProvider)
    .use(Button)
    .use(DatePicker)
    .use(Radio)
    .use(Layout)
    .use(Menu)
    .use(Breadcrumb)
    .use(Row)
    .use(Col)
    .use(Form)
    .use(Input)
    .use(Checkbox)
    .use(Dropdown)
    .use(Divider)
    .use(Modal)
    .use(Tag)
    .use(Spin);
}

const APP = createApp(app);
APP.config.globalProperties.$api = api;

APP.use(store, key)
  .use(router)
  .use(useTable)
  .use(useAntd)
  .directive('permission', permission)
  .mount('#app');
