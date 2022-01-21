<!-- @format -->

<template>
  <div class="logo"></div>
  <a-menu
    v-model:selectedKeys="activeMenu"
    v-model:openKeys="openMenu"
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
<script lang="ts">
import { defineComponent, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import OverlayScrollbars from 'overlayscrollbars';
import { routes } from '@/router/index';
import AppSidebarItem from './AppSidebarItem.vue';

export default defineComponent({
  name: 'AppSidebar',
  components: {
    AppSidebarItem,
  },
  setup() {
    const route = useRoute();
    const { path, matched } = route;
    const activeMenu = ref<string[]>([path]);
    const openMenu = ref<string[]>(['']);

    const getMenuData = () => {
      activeMenu.value = [route.path];

      const result: string[] = [];
      if (matched.length > 1) {
        activeMenu.value[0]
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
      openMenu.value = result;
    };

    getMenuData();

    watch(route, getMenuData);
    return {
      routes,
      activeMenu,
      openMenu,
    };
  },
  mounted() {
    OverlayScrollbars(document.querySelectorAll('.app-menu'), {
      className: 'os-theme-light',
      scrollbars: {
        autoHide: 'leave',
        visibility: 'auto',
      },
    });
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
}
</style>
