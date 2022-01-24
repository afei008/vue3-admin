<!-- @format -->

<template>
  <div class="login">
    <a-form
      :model="formData"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      :rules="rules"
    >
      <a-form-item label="Username" name="username">
        <a-input v-model:value="formData.username" placeholder="admin or editor" />
      </a-form-item>

      <a-form-item label="Password" name="password">
        <a-input-password v-model:value="formData.password" placeholder="any" />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="formData.remember">Remember me</a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit" :loading="isLoading">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
} from 'vue';
import { useStore } from '@/store'
import { RuleObject } from 'ant-design-vue/lib/form/interface';

interface FormTypes {
  username: string;
  password: string;
  remember: boolean;
}
export default defineComponent({
  name: 'Login',
  setup() {
    const store = useStore()
    const formData = reactive<FormTypes>({
      username: '',
      password: '',
      remember: true,
    });
    const isLoading = ref<boolean>(false)
    const checkUsername = async (_rule:RuleObject, value:string) => {
      if (value === '') {
        return Promise.reject(new Error('请输入用户名'))
      } if (value !== 'admin' && value !== 'editor') {
        return Promise.reject(new Error('请输入admin或editor'))
      }
      return Promise.resolve()
    }
    const rules = {
      username: [{ required: true, validator: checkUsername, trigger: 'change' }],
      password: [{ required: true, message: '请输入密码' }],
    };
    const onFinish = (values: any) => {
      const { username, password } = values
      isLoading.value = true
      store.dispatch('userState/login', { username, password }).finally(() => {
        isLoading.value = false
      })
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
  mounted() {
    // this.$api.login({ username: 'admin', password: '123' }).then((res: any) => {
    // console.log(res);
    // });
  },
});
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(deepskyblue, deeppink);
}
</style>
