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
import { defineComponent, onMounted, toRefs } from 'vue';
import useScrollbars from '@/composables/useScrollbars';
import AppSidebarItem from './AppSidebarItem.vue';
import useMenuKeys from './composables/useMenuKeys';
import useRefreshMenu from './composables/useRefreshMenu';
import collapsed from './composables/useCollapsed';

export default defineComponent({
  name: 'AppSidebar',
  components: {
    AppSidebarItem,
  },
  setup() {
    const { selectedKeys, openKeys } = useMenuKeys();
    const { refresh, routes } = useRefreshMenu();

    const { initScrollbars } = useScrollbars({
      className: 'os-theme-light',
      el: '.app-menu',
      x: 'hidden',
    });

    onMounted(() => {
      initScrollbars.value();
    });

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
</style>
