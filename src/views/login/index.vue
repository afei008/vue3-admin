<!-- @format -->

<template>
  <div class="login">
    <div class="form bg-white">
      <el-form
        ref="formRef"
        :model="formData"
        name="basic"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="admin or editor" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formData.password"
            placeholder="any"
            type="password"
            show-password
            @keyup.enter="submitForm"
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="formData.remeber">Remeber me</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="isLoading" @click="submitForm">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <rain />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import type { FormInstance } from 'element-plus';
import { useUserStore } from '@/store/modules/user';
import Rain from '@/components/Rain/index.vue';

interface FormTypes {
  username: string;
  password: string;
  remeber: boolean;
}

export default defineComponent({
  name: 'LoginIndex',
  components: { Rain },
  setup() {
    const userStore = useUserStore();
    const isLoading = ref<boolean>(false);
    const formRef = ref<FormInstance>();
    const formData = reactive<FormTypes>({
      username: '',
      password: '',
      remeber: true,
    });

    const checkUsername = async (rule: any, value: string, callback: any) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      }
      if (value !== 'admin' && value !== 'editor') {
        callback(new Error('请输入admin或editor'));
      }
      callback();
    };
    const rules = {
      username: [
        { required: true, validator: checkUsername, trigger: 'change' },
      ],
      password: [{ required: true, message: '请输入密码' }],
    };

    const submitForm = async () => {
      if (!formRef.value) {
        return;
      }
      await formRef.value.validate((valid, fields) => {
        if (valid) {
          isLoading.value = true;
          userStore
            .login({ username: formData.username, password: formData.password })
            .finally(() => {
              isLoading.value = false;
            });
        } else {
          console.log('error submit', fields);
        }
      });
    };

    return {
      formRef,
      formData,
      rules,
      isLoading,
      submitForm,
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
  box-sizing: border-box;
  width: 350px;
  padding: 30px;
}
</style>
