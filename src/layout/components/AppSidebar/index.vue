<!-- @format -->

<template>
  <a-layout-sider
    class="app-sidebar"
    breakpoint="lg"
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
  >
    <div class="logo"></div>
    <template v-if="refresh">
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        theme="dark"
        mode="inline"
        class="app-menu"
      >
        <app-sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        ></app-sidebar-item>
      </a-menu>
    </template>
  </a-layout-sider>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import AppSidebarItem from './AppSidebarItem.vue';
import useMenuKeys from './composables/useMenuKeys';
import useRefreshMenu from './composables/useRefreshMenu';
import useScroll from './composables/useScroll';
import collapsed from './composables/useCollapsed';

export default defineComponent({
  name: 'AppSidebar',
  components: {
    AppSidebarItem,
  },
  setup() {
    useScroll();
    const { selectedKeys, openKeys } = useMenuKeys();
    const { refresh, routes } = useRefreshMenu();

    return {
      selectedKeys,
      openKeys,
      routes,
      refresh,
      ...toRefs(collapsed),
    };
  },
});
</script>
<style lang="scss" scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}
.app-menu {
  height: calc(100vh - 64px);
  position: relative;
  margin-top: 0;
}
</style>
