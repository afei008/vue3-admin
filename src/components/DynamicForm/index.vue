<!-- @format -->

<template>
  <div>
    <a-form :model="formData" ref="formRef" layout="inline" :rules="rules">
      <component
        v-for="item in sortData"
        :key="item.name"
        :is="`${item.type}`"
        :item="item"
        :name="item.name"
      ></component>
    </a-form>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, ref, toRefs,
} from 'vue';
import formState from './composables/useFormData';
import { DynamicTypes } from './interface';
import initialFormItem from './components/index';

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
