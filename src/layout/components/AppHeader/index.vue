<!-- @format -->

<template>
  <a-layout-header class="app-header">
    <a-row align="middle">
      <a-col>
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="changeCollapsed"
        />
        <menu-fold-outlined v-else class="trigger" @click="changeCollapsed" />
      </a-col>
      <a-col>
        <app-breadcrumb />
      </a-col>
      <a-col class="dropdown">
        <a-dropdown>
          <span class="ant-dropdown-link">
            <img :src="avatar" class="avatar" />{{ nickname }}
          </span>
          <template #overlay>
            <a-menu @click="clickMenu">
              <a-menu-item :key="1"><link-outlined /> 项目地址</a-menu-item>
              <a-menu-item :key="2"><user-outlined /> 个人中心</a-menu-item>
              <a-menu-item :key="3"><setting-outlined /> 个人设置</a-menu-item>
              <a-menu-divider />
              <a-menu-item :key="0"><logout-outlined /> 退出登录</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-col>
    </a-row>
    <app-tags />
  </a-layout-header>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  LinkOutlined,
} from '@ant-design/icons-vue';
import AppBreadcrumb from './AppBreadcrumb.vue';
import AppTags from './AppTags/index.vue';
import useUserData from './composables/useUserData';
import useDropdownMethods from './composables/useDropdownMethods';
import collapsed from '../AppSidebar/composables/useCollapsed';

export default defineComponent({
  name: 'AppHeader',
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    LinkOutlined,
    AppBreadcrumb,
    AppTags,
  },
  setup() {
    const { nickname, avatar } = useUserData();
    const { clickMenu } = useDropdownMethods();

    return {
      nickname,
      avatar,
      clickMenu,
      ...toRefs(collapsed),
    };
  },
});
</script>
<style lang="scss" scoped>
.trigger {
  margin-right: 20px;
  font-size: 18px;
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
  padding: 0 10px;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}

.avatar {
  width: 30px;
  height: 30px;
  margin-right: 5px;
  border-radius: 50%;

  img {
    max-width: 100%;
  }
}
</style>
