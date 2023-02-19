/** @format */

import Mock from 'mockjs';
import type { OptionsTypes } from './interface';
import params2Obj from './utils';

export default [
  {
    url: '/user/login',
    type: 'post',
    response(options: OptionsTypes): Record<string, unknown> {
      const { username } = params2Obj(options);

      return {
        code: 200,
        msg: 'success',
        data: {
          id: Mock.Random.natural(1, 200),
          nickname: Mock.Random.cname(),
          roles: [username],
          token: `${username}-token`,
        },
      };
    },
  },
  {
    url: '/user/logout',
    type: 'post',
    response(): Record<string, unknown> {
      return { code: 200, msg: 'success', data: null };
    },
  },
];
