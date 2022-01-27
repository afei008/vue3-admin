<!-- @format -->

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      class="app-sidebar"
      breakpoint="lg"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <app-sidebar></app-sidebar>
    </a-layout-sider>
    <a-layout>
      <app-header @changeCollapsed="changeCollapsed"></app-header>
      <app-main></app-main>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { AppMain, AppHeader, AppSidebar } from './components/index';

export default defineComponent({
  components: {
    AppSidebar,
    AppHeader,
    AppMain,
  },
  setup() {
    const collapsed = ref<boolean>(false);
    const changeCollapsed = (v: boolean) => {
      collapsed.value = v;
    };
    return {
      collapsed,
      changeCollapsed,
    };
  },
});
</script>
<style lang="scss" scoped>
.app-sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}
.app-header {
  background: #fff;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 1;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  height: auto;
  line-height: initial;
}
.app-main {
  margin: 20px;
  background: #fff;
}

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
