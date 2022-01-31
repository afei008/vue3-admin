/** @format */

import Mock from 'mockjs';
import { OptionsTypes } from './interface';
import params2Obj from './utils';

const list: Array<Record<string, unknown>> = [];
const count = 100;

for (let i = 0; i < count; i += 1) {
  list.push(
    Mock.mock({
      id: '@increment',
      operator: '@cname',
      describe: '@ctitle(5,10)',
      'status|1': [0, 1, 2, 3],
      'statusStr|1': ['关闭', '已上线', '运行中', '异常'],
      updateTime: '@datetime',
      pageviews: '@integer(300, 5000)',
    }),
  );
}

export default [
  {
    url: '/article/list',
    type: 'get',
    response(options: OptionsTypes): Record<string, unknown> {
      const { pageNum = 1, pageSize = 20 } = params2Obj(options);

      const mockList = list.filter((item) => item);

      const data = mockList.filter(
        (item, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1),
      );

      return {
        code: 200,
        msg: 'success',
        data,
      };
    },
  },
];
