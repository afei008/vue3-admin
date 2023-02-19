<!-- @format -->

<template>
  <div>
    <a-form ref="formRef" :model="formData" layout="inline" :rules="rules">
      <component
        :is="`${item.type}`"
        v-for="item in sortData"
        :key="item.name"
        :item="item"
        :name="item.name"
      />
    </a-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from 'vue';
import formState from './composables/useFormData';
import initialFormItem from './components/index';

// type：表单项类型
// label：表单项标题
// name：提交的字段名
// value：默认值
// options：select、checkbox、radio 的 option 对象
// attrs：组件的属性
// rank：排序
export interface DynamicTypes {
  type: string;
  label?: string;
  name: string;
  value?: any;
  options?: Record<string, any> | null;
  attrs: Record<string, any>;
  rank?: number;
}

export default defineComponent({
  name: 'DynamicForm',
  components: { ...initialFormItem },
  props: {
    dynamicData: {
      type: Array,
      default: () => [],
    },
    formData: {
      type: Object,
      default: () => ({}),
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const { dynamicData, formData } = toRefs(props);

    formState.setData(formData.value);

    const formRef = ref();

    const sortData = computed(() => {
      const arr = dynamicData.value as DynamicTypes[];
      return arr.sort((a, b) => {
        const copya = { ...a };
        const copyb = { ...b };
        if (!copya.rank) {
          copya.rank = 0;
        }
        if (!copyb.rank) {
          copyb.rank = 0;
        }
        if (copya.rank === copyb.rank) {
          return 0;
        }
        return copya.rank > copyb.rank ? 1 : -1;
      });
    });

    const validate = () => formRef.value.validate();

    return { formRef, sortData, validate };
  },
});
</script>
