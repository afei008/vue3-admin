/** @format */

let temp = {};
const files = import.meta.glob('./**/index.ts', { eager: true });
Object.entries(files).forEach((item) => {
  const [key, value] = item as any;
  temp = { ...temp, ...value.default };
});

const api = { ...temp };

export default api;
