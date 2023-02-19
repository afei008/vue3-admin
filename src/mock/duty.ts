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
      level1Proportion: '@csentence(5, 10)',
      level2Proportion: '@csentence(5, 10)',
      level3Table: '@csentence(5, 10)',
      level3Request: '@csentence(5, 10)',
      label: () => [
        {
          id: 1,
          origin: '学习记录',
          label1: [{ id: 1, str: '学习' }],
          label2: [
            { id: 2, str: '安全生产法' },
            { id: 3, str: '高级生产法' },
          ],
          label3: [
            { id: 4, str: '国家' },
            { id: 5, str: '南网' },
          ],
        },
        {
          id: 2,
          origin: '签到表',
          label1: [{ id: 1, str: '签到' }],
          label2: [{ id: 2, str: '主题学习会议' }],
          label3: [{ id: 5, str: '南网' }],
        },
      ],
      basis: () => [
        {
          id: 1,
          type: 0,
          str: '（一）组织或者参与拟订本单位安全生产规章制度、操作规程和生产安全事故应急救援预案；',
        },
        {
          id: 2,
          type: 0,
          str: '（二）组织或者参与本单位安全生产教育和培训，如实记录安全生产教育和培训情况；',
        },
        {
          id: 3,
          type: 1,
          str: '（三）组织开展危险源辨识和评估，督促落实本单位重大危险源的安全管理措施；',
          old: '上一版：（三）组织开展危险源辨识和评估，督促落实本单位重大危险源的安全管理措施；',
        },
        {
          id: 4,
          type: 2,
          str: '生产经营单位可以设置专职安全生产分管负责人，协助本单位主要负责人履行安全生产管理职责。',
          old: '新增条款',
        },
      ],
      level: '@integer(1, 4)',
      function: '@csentence(5, 10)',
    })
  );
}

export default [
  {
    url: '/duty/list',
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
