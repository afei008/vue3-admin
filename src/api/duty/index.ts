/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRequest } from '@/axios/request';

interface DutyParams {
  pageNo: number;
  pageSize: number;
}

function dutyList(params: DutyParams): Promise<Api.Response<any>> {
  return getRequest('/duty/list', params);
}

export default {
  dutyList,
};
