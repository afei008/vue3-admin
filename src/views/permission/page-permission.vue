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
    <p>切换权限时，左侧的权限测试菜单会变化</p>
  </div>
</template>
<script lang="ts">
import { useStore } from '@/store';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PagePermission',
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
