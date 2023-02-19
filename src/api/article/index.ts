/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRequest } from '@/axios/request';

interface ArticleParams {
  pageNo: number;
  pageSize: number;
}

function articleList(params: ArticleParams): Promise<Api.Response<any>> {
  return getRequest('/article/list', params);
}

function articleAdd(): void {
  console.log(1);
}

export default {
  articleList,
  articleAdd,
};
