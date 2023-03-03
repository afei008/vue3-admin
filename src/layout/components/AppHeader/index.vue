<!-- @format -->

<template>
  <div class="flex ac">
    <el-icon v-if="collapsed" class="trigger" @click="changeCollapsed"
      ><expand
    /></el-icon>
    <el-icon v-else class="trigger" @click="changeCollapsed"><fold /></el-icon>
    <app-breadcrumb />
    <div class="dropdown">
      <el-dropdown @command="clickMenu">
        <span class="dropdown-link flex ac">
          <img :src="avatar" class="avatar" />{{ nickname }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="1">
              <el-icon><link-icon /></el-icon> 项目地址
            </el-dropdown-item>
            <el-dropdown-item :command="2">
              <el-icon><user /></el-icon> 个人中心
            </el-dropdown-item>
            <el-dropdown-item :command="3">
              <el-icon><setting /></el-icon> 个人设置
            </el-dropdown-item>
            <el-dropdown-item :command="0">
              <el-icon><switch-button /></el-icon> 退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <app-tags />

  <el-dialog v-model="showDialog" title="退出登录" width="300px">
    <span>确定退出登录吗？</span>
    <template #footer>
      <el-button type="primary" @click="clickConfirm">确定</el-button>
      <el-button @click="clickCancel">取消</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import {
  Expand,
  Fold,
  Link as LinkIcon,
  User,
  Setting,
  SwitchButton,
} from '@element-plus/icons-vue';
import AppBreadcrumb from './AppBreadcrumb.vue';
import AppTags from './AppTags/index.vue';
import useUserData from './composables/useUserData';
import useDropdownMethods from './composables/useDropdownMethods';
import collapsed from '../AppSidebar/composables/useCollapsed';

export default defineComponent({
  name: 'AppHeader',
  components: {
    Expand,
    Fold,
    LinkIcon,
    User,
    Setting,
    SwitchButton,
    AppBreadcrumb,
    AppTags,
  },
  setup() {
    const { nickname, avatar } = useUserData();
    const { clickMenu, showDialog, clickConfirm, clickCancel } =
      useDropdownMethods();

    return {
      nickname,
      avatar,
      clickMenu,
      ...toRefs(collapsed),
      showDialog,
      clickConfirm,
      clickCancel,
    };
  },
});
</script>
<style lang="scss" scoped>
.trigger {
  margin-right: 20px;
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: var(--primary-color);
  }
}

.dropdown {
  margin-left: auto;
}

.dropdown-link {
  padding: 0 10px;
  cursor: pointer;
  outline: 0;

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
