/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import qs from 'qs';
import axios from './index';

function getRequest(url: string, params = {}): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function postRequest(url: string, params = {}): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(url, qs.stringify(params))
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { getRequest, postRequest };
