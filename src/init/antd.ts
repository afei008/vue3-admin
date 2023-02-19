/** @format */

import type { App } from 'vue';
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
  Tooltip,
  Select,
  Card,
  Tabs,
  Upload,
} from 'ant-design-vue';

export default function useAntd(app: App): void {
  app
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
    .use(Spin)
    .use(Tooltip)
    .use(Select)
    .use(Card)
    .use(Tabs)
    .use(Upload);
}
