/** @format */

import { register, getTeleport } from '@antv/x6-vue-shape';

const shapeList: Array<{ shape: string; title: string }> = [];
const files = import.meta.glob('./*.vue', { eager: true });
Object.keys(files).forEach((item) => {
  const key = item.slice(2, -4);
  const shape = key.slice(0, 1).toLocaleLowerCase() + key.slice(1, -5);
  register({
    shape: `custom-vue-${shape}`,
    width: 100,
    height: 100,
    component: (files[item] as Record<string, unknown>).default,
  });
  shapeList.push({ shape, title: key.slice(0, -5) });
});
const TeleportContainer = getTeleport();

export { shapeList };
export default TeleportContainer;
