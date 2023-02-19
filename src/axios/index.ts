/** @format */

import axios, { type AxiosRequestConfig } from 'axios';
import { useUserStore } from '@/store/modules/user';
import { getToken } from '@/storage/user';

function getBaseUrl(type = 1): string {
  switch (type) {
    case 1:
      return '/api';
    case 2:
      return '2';
    default:
      return '1';
  }
}

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.timeout = 60000;
axios.defaults.baseURL = getBaseUrl();

const instanceAxios = axios.create({
  timeout: 60000,
  baseURL: getBaseUrl(),
});

instanceAxios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const userStore = useUserStore();
    if (userStore.token) {
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      // eslint-disable-next-line no-param-reassign
      config!.headers!.Authorization = getToken();
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instanceAxios.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      return Promise.reject(new Error(res.msg || 'Error'));
    }
    return res;
  },
  (error) => {
    console.log(`err${error}`);
    return Promise.reject(error);
  }
);

export default instanceAxios;
