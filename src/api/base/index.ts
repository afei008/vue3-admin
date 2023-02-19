/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

function fileUpload(params: Record<string, any>): Promise<Api.Response<any>> {
  const { blobInfo } = params;
  const formdata = new FormData();
  formdata.set('upload_file', blobInfo.blob());
  return axios.post('https://httpbin.org/post', formdata);
}

export default {
  fileUpload,
};
