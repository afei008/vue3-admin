/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { reactive, ref, type Ref } from 'vue';

export interface FormDataTypes {
  sn?: number | string;
  name?: string;
}

interface FormTypes {
  formRef: Ref;
  formData: FormDataTypes;
  formParams: Ref<any>;
  submitForm: (values: any) => void;
  resetForm: () => void;
}

export default function useForm(): FormTypes {
  const formRef = ref({} as any);

  const formData = reactive<FormDataTypes>({
    sn: '',
    name: '',
  });

  const formParams = ref({ pageNum: 1, pageSize: 10 });

  const submitForm = (values: any) => {
    formParams.value = { ...formData, ...values, pageNum: 1 };
  };

  const resetForm = () => {
    formRef.value.resetFields();
  };

  return {
    formRef,
    formData,
    formParams,
    submitForm,
    resetForm,
  };
}
