/** @format */

import { reactive, Ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';

interface MenuKeysTypes {
  activeKeys: Ref<string[]>;
  openKeys: Ref<string[]>;
}

export default function useMenuKeys(): MenuKeysTypes {
  const route = useRoute();

  const { path, matched } = route;
  const state = reactive({
    activeKeys: [path],
    openKeys: [''],
  });

  const getMenuKeys = () => {
    state.activeKeys = [route.path];

    const result: string[] = [];
    if (matched.length > 1) {
      state.activeKeys[0]
        .split('/')
        .slice(1)
        .reduce((acc, cur) => {
          if (result.length === 0) {
            result.push(`/${acc}`);
            result.push(`/${acc}/${cur}`);
          } else {
            result.push(`/${acc}/${cur}`);
          }
          return `${acc}/${cur}`;
        });
    }
    state.openKeys = result;
  };

  getMenuKeys();

  // 打开该行代码将只展开当前父级菜单
  // watch(route, getMenuKeys);

  return {
    ...toRefs(state),
  };
}
