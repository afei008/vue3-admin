/** @format */

import { createApp, type ComponentPublicInstance } from 'vue';
import useAntd from '@/init/antd';
import comp from './comp.vue';

// 方法 1，因为上下文丢失，需要重新引入 store 和组件库
function createComponent(options = {}): ComponentPublicInstance {
  const app = createApp(comp, options);
  const el = document.createElement('div');
  app.use(useAntd);
  const instance = app.mount(el);
  return instance.$el;
}

// import APP from '@/main';
// 方法 2，将原上下文关联过来，但是用到了内部属性 _context，此时编辑器会提示循环引用
// function createComponent(options = {}): RendererNode {
//   const el = document.createElement('el');
//   const instance = createVNode(comp, options);
//   // eslint-disable-next-line no-underscore-dangle
//   instance.appContext = APP._context;
//   render(instance, el);
//   return instance.el as RendererNode;
// }

export default createComponent;

// 方法 3，正确关联上下文，但是需要在 main.ts 处 use 一下，感觉不太合适，因为这个组件只用于地图的自定义窗体
// function createEl(app: App, options = {}): RendererNode {
//   const instance = createVNode(comp, options);
//   const el = document.createElement('div');

//   // eslint-disable-next-line no-underscore-dangle
//   instance.appContext = app._context;
//   render(instance, el);
//   return instance.el as RendererNode;
// }

// // eslint-disable-next-line import/no-mutable-exports
// let InfoWindow: (options: Record<string, unknown>) => RendererNode;
// export default function fc(app: App): void {
//   InfoWindow = (options = {}): RendererNode => createEl(app, options);
//   // eslint-disable-next-line no-param-reassign
//   app.config.globalProperties.$infoWindow = (options = {}) => createEl(app, options);
// }
// export { InfoWindow };
