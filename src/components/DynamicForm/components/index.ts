/** @format */

const temp: Record<string, any> = {};
const files = import.meta.glob('./*.vue', { eager: true });
Object.entries(files).forEach((item) => {
  const [key, value] = item as any;
  const compName = `${key.replace(/(^\.\/)|(.vue)$/g, '')}`;
  temp[compName] = value.default;
});

const components = temp;

export default components;
