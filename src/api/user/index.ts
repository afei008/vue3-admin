/** @format */

import { postRequest } from '@/axios/request';

import type { Login, LoginParams, Logout } from './interface';

export function login(params: LoginParams): Promise<Api.Response<Login>> {
  return postRequest('/user/login', params);
}

export function logout(): Promise<Api.Response<Logout>> {
  return postRequest('/user/logout');
}

export default { login, logout };
