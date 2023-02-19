/** @format */

import { onMounted, reactive, toRefs, watch, type Ref } from 'vue';
import { useRoute } from 'vue-router';

interface MenuKeysTypes {
  selectedKeys: Ref<string[]>;
  openKeys: Ref<string[]>;
  getOpenKeys: () => void;
}

export default function useMenuKeys(): MenuKeysTypes {
  const route = useRoute();

  const { path, matched } = route;
  const state = reactive({
    selectedKeys: [path],
    openKeys: [''],
  });

  const getSelectedKeys = () => {
    state.selectedKeys = [route.path];
  };

  const getOpenKeys = () => {
    const result: string[] = [];
    if (matched.length > 1) {
      state.selectedKeys[0]
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

  watch(route, () => {
    getSelectedKeys();
    // 取消注释该行代码，左侧菜单将自动折叠
    // getOpenKeys();
  });

  onMounted(() => {
    getSelectedKeys();
    getOpenKeys();
  });

  return {
    ...toRefs(state),
    getOpenKeys,
  };
}
