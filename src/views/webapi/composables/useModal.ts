/** @format */

import { reactive, ref } from 'vue';
import { Form } from 'ant-design-vue';

import type { CustomerType } from './useIndexedDB';

const { useForm } = Form;

export default function useModal() {
  const showModal = ref(false);

  const modelRef = reactive({
    sn: '',
    name: '',
    age: '',
    email: '',
  } as CustomerType);

  const rulesRef = reactive({
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
  const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef, {
    onValidate: (...args) => console.log(...args),
  });
  return {
    showModal,
    modelRef,
    modalValidateInfos: validateInfos,
    modalResetFields: resetFields,
    modalValidate: validate,
  };
}
