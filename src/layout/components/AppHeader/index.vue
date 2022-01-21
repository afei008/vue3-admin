<!-- @format -->

<template>
  <a-row align="middle">
    <a-col>
      <menu-unfold-outlined v-if="collapsed" class="trigger" @click="change" />
      <menu-fold-outlined v-else class="trigger" @click="change" />
    </a-col>
    <a-col>
      <app-breadcrumb></app-breadcrumb>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import AppBreadcrumb from './AppBreadcrumb.vue';

export default defineComponent({
  name: 'AppHeader',
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    AppBreadcrumb,
  },
  emits: {
    changeCollapsed: null,
  },
  setup() {
    return {
      collapsed: ref<boolean>(false),
    };
  },
  methods: {
    change() {
      this.collapsed = !this.collapsed;
      this.$emit('changeCollapsed', this.collapsed);
    },
  },
});
</script>
<style lang="scss" scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
}
</style>
