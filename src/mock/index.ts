/** @format */

import Mock from 'mockjs';
import user from './user';
import article from './article';
import { MockParams } from './interface';

const mocks = [...user, ...article];

Mock.setup({
  timeout: '300-600',
});

export default function mockXHR(): void {
  mocks.forEach((item: MockParams) => {
    Mock.mock(new RegExp(`/api${item.url}`), item.type || 'get', item.response);
  });
}
