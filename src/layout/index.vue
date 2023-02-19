<!-- @format -->

<template>
  <a-layout style="min-height: 100vh">
    <app-sidebar />
    <a-layout>
      <app-header />
      <app-main />
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { AppMain, AppHeader, AppSidebar } from './components/index';

export default defineComponent({
  name: 'LayoutIndex',
  components: {
    AppSidebar,
    AppHeader,
    AppMain,
  },
});
</script>
<style lang="scss" scoped>
:deep(.ant-layout-sider-collapsed) {
  .ant-menu-submenu-title {
    padding: 0 32px !important;
  }

  .menu-title .menu-icon {
    margin-right: 0;
  }

  .menu-text,
  .ant-menu-submenu-arrow {
    width: 0;
    opacity: 0 !important;
  }
}
</style>
