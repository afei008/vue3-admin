/** @format */

export interface Login {
  id: number;
  nickname: string;
  roles: Array<string>;
  token: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export type Logout = null;
