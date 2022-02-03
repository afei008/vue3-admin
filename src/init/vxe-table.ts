/** @format */

import { App } from 'vue';
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
  Filter,
  Radio as VxeRadio,
} from 'vxe-table';
import '@/style/theme/vxe-table.scss';
import zhCN from 'vxe-table/lib/locale/lang/zh-CN';
import '@/vxe-components';

VXETable.setup({
  i18n: (vxekey, args) => XEUtils.toFormatString(XEUtils.get(zhCN, vxekey), args),
});
export default function useTable(app: App): void {
  app
    .use(Header)
    .use(Column)
    .use(Table)
    .use(Grid)
    .use(Pager)
    .use(VxeInput)
    .use(VxeSelect)
    .use(Filter)
    .use(VxeRadio);
}
