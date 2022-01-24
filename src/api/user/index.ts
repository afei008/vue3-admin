/** @format */

// import { postRequest } from '@/axios/request';

import { Login, LoginParams, Logout } from './interface';

export function login(params: LoginParams): Promise<Api.Response<Login>> {
  // return postRequest('/api/login', params);
  return new Promise((resolve) => {
    const res = {
      code: 200,
      data: {
        id: 1,
        nickname: `${params.username}`,
        roles: [`${params.username}`, 'tester'],
        token: `${params.username}-token`,
      },
      msg: 'success',
    };
    setTimeout(() => {
      resolve(res);
    }, 500);
  });
}

export function logout(): Promise<Logout> {
  // return postRequest('/api/logout');
  return new Promise((resolve) => {
    const res = {
      code: 200,
    }
    setTimeout(() => {
      resolve(res);
    }, 500);
  });
}

export default { login, logout };
