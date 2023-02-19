/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { OptionsTypes } from './interface';

export default function params2Obj(options: OptionsTypes): Record<string, any> {
  const obj = {} as Record<string, any>;
  let str = '';

  if (options.body) {
    str = options.body;
  } else {
    str = decodeURIComponent(options.url.split('?')[1]);
    if (!str) {
      return obj;
    }
  }
  const arr = str.split('&');
  arr.forEach((item) => {
    const index = item.indexOf('=');
    if (index !== -1) {
      const name = item.slice(0, index);
      const val = item.slice(index + 1, item.length);
      obj[name] = val;
    }
  });

  return obj;
}
