<!-- @format -->

<template>
  <div class="login">
    <div class="form bg-white">
      <a-form
        :model="formData"
        name="basic"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 17 }"
        autocomplete="off"
        :rules="rules"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item label="Username" name="username">
          <a-input
            v-model:value="formData.username"
            placeholder="admin or editor"
          />
        </a-form-item>

        <a-form-item label="Password" name="password">
          <a-input-password
            v-model:value="formData.password"
            placeholder="any"
          />
        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ offset: 7, span: 17 }">
          <a-checkbox v-model:checked="formData.remember">
            Remember me
          </a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 7, span: 17 }">
          <a-button type="primary" html-type="submit" :loading="isLoading">
            Submit
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <rain />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import type { RuleObject } from 'ant-design-vue/lib/form/interface';
import { useUserStore } from '@/store/modules/user';
import Rain from '@/components/Rain/index.vue';

interface FormTypes {
  username: string;
  password: string;
  remember: boolean;
}
export default defineComponent({
  name: 'LoginIndex',
  components: { Rain },
  setup() {
    const userStore = useUserStore();
    const formData = reactive<FormTypes>({
      username: '',
      password: '',
      remember: true,
    });
    const isLoading = ref<boolean>(false);
    const checkUsername = async (_rule: RuleObject, value: string) => {
      if (value === '') {
        return Promise.reject(new Error('请输入用户名'));
      }
      if (value !== 'admin' && value !== 'editor') {
        return Promise.reject(new Error('请输入admin或editor'));
      }
      return Promise.resolve();
    };
    const rules = {
      username: [
        { required: true, validator: checkUsername, trigger: 'change' },
      ],
      password: [{ required: true, message: '请输入密码' }],
    };
    const onFinish = (values: FormTypes) => {
      const { username, password } = values;
      isLoading.value = true;
      userStore.login({ username, password }).finally(() => {
        isLoading.value = false;
      });
    };

    const onFinishFailed = (err: any) => {
      console.log('Failed:', err);
    };
    return {
      formData,
      rules,
      isLoading,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #222;
}

.form {
  padding: 30px;
}
</style>
