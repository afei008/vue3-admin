/** @format */

import { InjectionKey } from 'vue';
import {
  createStore, useStore as baseUseStore, Store, ModuleTree,
} from 'vuex';
import RootStateTypes, { AllStateTypes } from './interface';

const files = require.context('./modules', true, /\.ts$/);
const modules: ModuleTree<RootStateTypes> = {};
files.keys().forEach((fileName) => {
  if (fileName.indexOf('/index.ts') < 0) {
    return;
  }
  const moduleName = `${fileName.replace(/(^\.\/)|(\/index.ts)$/g, '')}State`;
  modules[moduleName] = {
    namespaced: true,
    ...files(fileName).default,
  };
});

export default createStore<RootStateTypes>({
  state: {
    test: '',
  },
  getters: {},
  mutations: {},
  actions: {},
  modules,
});

export const key: InjectionKey<Store<RootStateTypes>> = Symbol('vue-store');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useStore<T = AllStateTypes>() {
  return baseUseStore<T>(key);
}
