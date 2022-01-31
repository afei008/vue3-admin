/** @format */

let temp = {};
const files = require.context('./', true, /\.ts$/);
files.keys().forEach((fileName) => {
  if (fileName === './index.ts' || fileName.indexOf('/index.ts') < 0) {
    return;
  }
  temp = { ...temp, ...files(fileName).default };
});

const api = { ...temp };

export default api;
