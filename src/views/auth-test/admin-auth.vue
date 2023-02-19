<!-- @format -->

<template>
  <div>
    admin auth
    <a-button @click="changePermission('admin')">admin</a-button>
    <a-button @click="changePermission('editor')">editor</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';

export default defineComponent({
  name: 'AdminAuth',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore();

    const changePermission = (role: string) => {
      userStore.changeRoles([role]).then(() => {
        if (!router.hasRoute(route.name as string)) {
          router.push('/404');
        }
      });
    };
    return { changePermission };
  },
});
</script>
