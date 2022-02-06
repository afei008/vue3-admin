/** @format */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const temp: Record<string, any> = {};
const files = require.context('./', true, /\.vue$/);
files.keys().forEach((fileName) => {
  if (fileName === '/index.ts') {
    return;
  }
  const compName = `${fileName.replace(/(^\.\/)|(.vue)$/g, '')}`;
  const com = files(fileName).default;
  temp[compName] = com;
});

const components = temp;

export default components;
