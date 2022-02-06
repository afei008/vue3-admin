<!-- @format -->

<template>
  <div>
    <p>当前权限:{{ currRole }}</p>
    <a-button :type="btnType('admin')" @click="changePermission('admin')">
      admin
    </a-button>
    <a-button :type="btnType('editor')" @click="changePermission('editor')">
      editor
    </a-button>
    <div :key="key">
      <p v-permission="['admin']">
        只有 admin 才能看到该文字
        <span>v-permission="['admin']"</span>
      </p>
      <p v-permission="['editor']">
        只有 editor 才能看到该文字
        <span>v-permission="['editor']"</span>
      </p>
      <p v-permission="['admin', 'editor']">
        admin 和 editor 都能看到该文字
        <span>v-permission="['admin', 'editor']"</span>
      </p>

      <p>不适合使用 v-permission 的情况下，请手动设置 v-if 实现</p>
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from '@/store';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'DirectivePermission',
  setup() {
    const store = useStore();

    // 切换权限时初始化指令
    const key = ref(1);

    const currRole = computed(() => store.getters['userState/roles']);
    const changeRoles = (role: Array<string>) => store.dispatch('userState/changeRoles', role);

    const changePermission = (role: string) => {
      key.value += 1;
      changeRoles([role]);
    };

    const btnType = (role: string) => (currRole.value.includes(role) ? 'primary' : 'default');

    return {
      key,
      currRole,
      changePermission,
      btnType,
    };
  },
});
</script>
