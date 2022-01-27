/** @format */

import { useStore } from '@/store';
import {
  computed, nextTick, ref, Ref, watch,
} from 'vue';
import { RouteRecordRaw } from 'vue-router';

interface RefreshMenuTypes {
  refresh: Ref<boolean>;
  // 此处类型如果用 Ref<RouteRecordRaw[]>，热加载的时候会报错
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routes: any;
}

export default function useRefreshMenu(): RefreshMenuTypes {
  const store = useStore();

  // 暂无好方法直接通过 mapGetters 获取
  const newRoutes = computed(() => store.getters['permissionState/newRoutes']);
  // 重载菜单
  const refresh = ref<boolean>(true);
  const routes = ref<RouteRecordRaw[]>(newRoutes.value);

  watch(
    newRoutes,
    (nv) => {
      refresh.value = false;
      routes.value = nv;
      nextTick(() => {
        refresh.value = true;
      });
    },
    { deep: true },
  );

  return {
    refresh,
    routes,
  };
}
