<!-- @format -->

<template>
  <a-layout-header class="app-header">
    <a-row align="middle">
      <a-col>
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="change"
        />
        <menu-fold-outlined v-else class="trigger" @click="change" />
      </a-col>
      <a-col>
        <app-breadcrumb></app-breadcrumb>
      </a-col>
      <a-col class="dropdown">
        <a-dropdown>
          <span class="ant-dropdown-link">
            <img :src="avatar" class="avatar" />{{ nickname }}
          </span>
          <template #overlay>
            <a-menu @click="clickMenu">
              <a-menu-item :key="1"><user-outlined />个人中心 </a-menu-item>
              <a-menu-item :key="2"><setting-outlined />个人设置 </a-menu-item>
              <a-menu-divider></a-menu-divider>
              <a-menu-item :key="3"><logout-outlined />退出登录 </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-col>
    </a-row>
    <app-tags></app-tags>
  </a-layout-header>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons-vue';
import AppBreadcrumb from './AppBreadcrumb.vue';
import AppTags from './AppTags/index.vue';
import useUserData from './composables/useUserData';
import useDropdownMethods from './composables/useDropdownMethods';

export default defineComponent({
  name: 'AppHeader',
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    AppBreadcrumb,
    AppTags,
  },
  emits: {
    changeCollapsed: null,
  },
  setup(props, context) {
    const collapsed = ref<boolean>(false);

    const change = () => {
      collapsed.value = !collapsed.value;
      context.emit('changeCollapsed', collapsed.value);
    };

    const { nickname, avatar } = useUserData();
    const { clickMenu } = useDropdownMethods();

    return {
      collapsed,
      nickname,
      avatar,
      clickMenu,
      change,
    };
  },
});
</script>
<style lang="scss" scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  margin-right: 20px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
}
.dropdown {
  margin-left: auto;
}
.ant-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 10px;
  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
  img {
    max-width: 100%;
  }
}
</style>
