/** @format */

import type { RouteRecordRaw } from 'vue-router';
import { computed, nextTick, ref, watch, type Ref } from 'vue';
import { usePermissionStore } from '@/store/modules/permission';

interface RefreshMenuTypes {
  refresh: Ref<boolean>;
  // 此处类型如果用 Ref<RouteRecordRaw[]>，热加载的时候会报错
  routes: any;
}

export default function useRefreshMenu(): RefreshMenuTypes {
  const permissionStore = usePermissionStore();

  // 暂无好方法直接通过 mapGetters 获取
  const newRoutes = computed(() => permissionStore.newRoutes);
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
    { deep: true }
  );

  return {
    refresh,
    routes,
  };
}
