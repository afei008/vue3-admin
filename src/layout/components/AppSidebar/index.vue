<!-- @format -->

<template>
  <el-aside class="app-sidebar" :class="{ collapsed: collapsed }">
    <div class="logo" />
    <template v-if="refresh">
      <overlay-scrollbars-component
        defer
        :options="{
          scrollbars: {
            autoHide: 'leave',
            theme: 'os-theme-light',
          },
          overflow: {
            x: 'hidden',
          },
        }"
      >
        <div class="app-menu-wrap">
          <el-menu
            :default-active="active"
            active-text-color="#fff"
            background-color="#001529"
            text-color="rgba(255, 255, 255, .65)"
            class="app-menu"
            :collapse="collapsed"
          >
            <app-sidebar-item
              v-for="route in routes"
              :key="route.path"
              :item="route"
              :base-path="route.path"
            />
          </el-menu>
        </div>
      </overlay-scrollbars-component>
    </template>
  </el-aside>
</template>
<script lang="ts">
import { defineComponent, toRefs, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
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
    const route = useRoute();
    const active = ref('/dashboard/workplace');

    onMounted(() => {
      active.value = route.path;
    });

    return {
      selectedKeys,
      openKeys,
      routes,
      refresh,
      ...toRefs(collapsed),
      active,
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
