<!-- @format -->

<template>
  <div>
    <a-button @click="changePermission('admin')">admin</a-button>
    <a-button @click="changePermission('editor')">editor</a-button>
    <div :key="key">
      <div v-permission="['admin']">admin permission</div>
      <div v-permission="['admin', 'editor']">editor permission</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'PagePermission',
  data() {
    return {
      // 切换权限时初始化指令
      key: 1,
    };
  },
  methods: {
    ...mapActions('userState', ['changeRoles']),
    changePermission(role: string) {
      this.key += 1;
      this.changeRoles([role]);
    },
  },
});
</script>
