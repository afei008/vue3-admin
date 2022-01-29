<!-- @format -->

<template>
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
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import AppSidebarItem from './AppSidebarItem.vue';
import useMenuKeys from './composables/useMenuKeys';
import useRefreshMenu from './composables/useRefreshMenu';
import useScroll from './composables/useScroll';

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
