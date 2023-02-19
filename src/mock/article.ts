/** @format */

import Mock from 'mockjs';
import type { OptionsTypes } from './interface';
import params2Obj from './utils';

const list: Array<Record<string, unknown>> = [];
const count = 100;

for (let i = 0; i < count; i += 1) {
  list.push(
    Mock.mock({
      id: '@increment',
      operator: '@cname',
      describe: '@ctitle(5,10)',
      'status|1': [1, 2, 3, 4],
      // 'statusStr|1': ['关闭', '已上线', '运行中', '异常'],
      statusStr: (e: any) => {
        const { status } = e.context.currentContext;
        switch (status) {
          case 1:
            return '关闭';
          case 2:
            return '已上线';
          case 3:
            return '运行中';
          case 4:
            return '异常';
          default:
            return '';
        }
      },
      updateTime: '@datetime',
      pageviews: '@integer(300, 5000)',
      checked: false,
    })
  );
}

export default [
  {
    url: '/article/list',
    type: 'get',
    response(options: OptionsTypes): Record<string, unknown> {
      const {
        status,
        operator,
        pageNum = 1,
        pageSize = 10,
      } = params2Obj(options);

      const mockList = list.filter((item: any) => {
        if (+status && +status !== item.status) {
          return false;
        }
        if (operator && item.operator.indexOf(operator) < 0) {
          return false;
        }
        return true;
      });

      const data = mockList.filter(
        (item, index) =>
          index < pageSize * pageNum && index >= pageSize * (pageNum - 1)
      );

      return {
        code: 200,
        msg: 'success',
        data: {
          total: mockList.length,
          records: data,
        },
      };
    },
  },
];
