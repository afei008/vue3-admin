<!-- @format -->

<template>
  <a-layout style="min-height: 100vh">
    <app-sidebar></app-sidebar>
    <a-layout>
      <app-header></app-header>
      <app-main></app-main>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { AppMain, AppHeader, AppSidebar } from './components/index';

export default defineComponent({
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
    opacity: 0 !important;
    width: 0;
  }
}
</style>
