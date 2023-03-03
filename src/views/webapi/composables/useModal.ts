/** @format */

import type { FormInstance } from 'element-plus';
import { reactive, ref } from 'vue';
import type { CustomerType } from './useIndexedDB';

export default function useModal() {
  const showModal = ref(false);

  const modelFormRef = ref<FormInstance>();

  const modelFormData = reactive({
    sn: '',
    name: '',
    age: '',
    email: '',
  } as CustomerType);

  const modelFormRules = reactive({
    sn: [
      {
        required: true,
        message: '请输入 ssn 码',
      },
    ],
    name: [
      {
        required: true,
        message: '请输入姓名',
      },
    ],
    age: [
      {
        required: true,
        message: '请输入年龄',
      },
    ],
    email: [
      {
        required: true,
        message: '请输入邮箱',
      },
    ],
  });

  return {
    showModal,
    modelFormRef,
    modelFormData,
    modelFormRules,
  };
}
