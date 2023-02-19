<!-- @format -->

<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    class="app-sidebar"
    breakpoint="lg"
    :trigger="null"
    collapsible
  >
    <div class="logo" />
    <template v-if="refresh">
      <overlay-scrollbars-component
        defer
        :options="{
          scrollbars: {
            autoHide: 'leave',
          },
          overflow: {
            x: 'hidden',
          },
        }"
      >
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
          />
        </a-menu>
      </overlay-scrollbars-component>
    </template>
  </a-layout-sider>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import AppSidebarItem from './AppSidebarItem.vue';
import useMenuKeys from './composables/useMenuKeys';
import useRefreshMenu from './composables/useRefreshMenu';
import collapsed from './composables/useCollapsed';

export default defineComponent({
  name: 'AppSidebar',
  components: {
    AppSidebarItem,
    OverlayScrollbarsComponent,
  },
  setup() {
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
</style>
