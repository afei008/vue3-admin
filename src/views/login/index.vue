<!-- @format -->

<template>
  <div class="login flex ac jc">
    <div class="form-wrap">
      <h1 class="form-head">Login Admin</h1>
      <div class="input-wrap flex column je pr">
        <input
          v-model="formData.username"
          class="input"
          required
          placeholder="admin"
          @keyup.enter="submitForm"
          @keyup="showErrTips.username = false"
        />
        <span class="label pa">username</span>
        <span class="error-tips pa" :class="{ show: showErrTips.username }"
          >请检查用户名</span
        >
      </div>
      <div class="input-wrap flex column je pr">
        <input
          v-model="formData.password"
          type="password"
          class="input"
          required
          placeholder="any"
          @keyup.enter="submitForm"
          @keyup="showErrTips.password = false"
        />
        <span class="label pa">password</span>
        <span class="error-tips pa" :class="{ show: showErrTips.password }"
          >请输入密码</span
        >
      </div>
      <div class="input-wrap flex ac">
        <input id="remember" type="checkbox" />
        <label class="check-label pr" for="remember" />
      </div>
      <button class="btn" @click="submitForm">Sign in</button>
    </div>
  </div>
</template>
<script setup lang="ts" name="LoginIndex">
import { ref, reactive } from 'vue';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();
const formData = reactive({
  username: '',
  password: '',
  remember: true,
});
const isLoading = ref<boolean>(false);
const showErrTips = reactive({
  username: false,
  password: false,
});
const submitForm = () => {
  if (!formData.username || formData.username !== 'admin') {
    showErrTips.username = true;
    return;
  }
  if (!formData.password) {
    showErrTips.password = true;
    return;
  }

  isLoading.value = true;
  userStore
    .login({
      username: formData.username,
      password: formData.password,
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<style lang="scss" scoped>
@import './style';
</style>
