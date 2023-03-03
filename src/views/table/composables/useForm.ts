/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { reactive, ref, type Ref } from 'vue';

export interface FormDataTypes {
  status?: number;
  operator?: string;
  pageNum: number;
  pageSize: number;
}

interface FormTypes {
  formRef: Ref;
  formData: FormDataTypes;
  params: Ref<any>;
  submitForm: (values: any) => void;
  statusOptions: Ref<any[]>;
  resetForm: () => void;
}

export default function useForm(): FormTypes {
  const formRef = ref({} as any);

  const formData = reactive<FormDataTypes>({
    status: undefined,
    operator: '',
    pageNum: 1,
    pageSize: 10,
  });

  const params = ref({ pageNum: 1, pageSize: 10 });

  const submitForm = (values: any) => {
    if (!formRef.value) {
      return;
    }
    if (values.pageSize) {
      formData.pageSize = values.pageSize;
    }
    if (values.isPageChange) {
      params.value = { ...formData, ...values };
    } else {
      params.value = { ...formData, ...values, pageNum: 1 };
    }
  };

  const statusOptions = ref<any[]>([
    { value: '', label: '全部' },
    { value: 1, label: '关闭' },
    { value: 2, label: '已上线' },
    { value: 3, label: '运行中' },
    { value: 4, label: '异常' },
  ]);

  const resetForm = () => {
    formRef.value.resetFields();
  };

  return {
    formRef,
    formData,
    params,
    submitForm,
    statusOptions,
    resetForm,
  };
}
