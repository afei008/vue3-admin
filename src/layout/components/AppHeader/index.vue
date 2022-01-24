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
    <a-col class="dropdown">
      <a-dropdown>
        <span class="ant-dropdown-link"
          ><img :src="avatar" class="avatar" />{{ nickname }}</span
        >
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
</template>
<script lang="ts">
import {
  defineComponent, ref, computed, createVNode,
} from 'vue';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons-vue';
import { useStore } from '@/store';
import avatar from '@/assets/avatar.png';
import { Modal } from 'ant-design-vue';
import AppBreadcrumb from './AppBreadcrumb.vue';

export default defineComponent({
  name: 'AppHeader',
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    AppBreadcrumb,
  },
  emits: {
    changeCollapsed: null,
  },
  setup() {
    const store = useStore();

    const logout = () => store.dispatch('userState/logout');

    const showModal = () => {
      Modal.confirm({
        title: '退出登录',
        icon: createVNode(QuestionCircleOutlined),
        content: createVNode('div', {}, '确定退出登录吗？'),
        onOk() {
          return logout();
        },
        class: 'test',
      });
    };
    const clickMenu = ({ key }: { key: number }) => {
      switch (key) {
        case 3:
          showModal();
          break;
        default:
          console.log(`Click on item ${key}`);
      }
    };
    return {
      collapsed: ref<boolean>(false),
      nickname: computed(() => store.getters['userState/nickname']),
      avatar,
      clickMenu,
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
  padding: 0 20px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
}
.dropdown {
  margin-left: auto;
  margin-right: 20px;
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
