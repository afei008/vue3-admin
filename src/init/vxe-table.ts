/** @format */

import type { App } from 'vue';
import XEUtils from 'xe-utils';
import {
  VXETable,
  Column,
  Table,
  Grid,
  Pager,
  Select,
  Input,
  Filter,
  Radio,
  Edit,
  Keyboard,
} from 'vxe-table';
import '@/style/theme/vxe-table.scss';
import zhCN from 'vxe-table/lib/locale/lang/zh-CN';
import '@/vxe-components';

VXETable.setup({
  i18n: (vxekey, args) =>
    XEUtils.toFormatString(XEUtils.get(zhCN, vxekey), args),
});
export default function useTable(app: App): void {
  app
    .use(Column)
    .use(Table)
    .use(Grid)
    .use(Pager)
    .use(Input)
    .use(Select)
    .use(Filter)
    .use(Radio)
    .use(Edit)
    .use(Keyboard);
}
