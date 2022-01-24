<!-- @format -->

<template>
  admin auth
  <a-button @click="changePermission('admin')">admin</a-button>
  <a-button @click="changePermission('editor')">editor</a-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'AdminAuth',
  methods: {
    ...mapActions('userState', ['changeRoles']),
    changePermission(role: string) {
      this.changeRoles([role]).then(() => {
        if (!this.$router.hasRoute(this.$route.name as string)) {
          this.$router.push('/404')
        }
      })
    },
  },
});
</script>
