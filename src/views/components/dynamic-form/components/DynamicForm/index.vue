<!-- @format -->

<template>
  <div class="form-wrap">
    <a-form ref="formRef" :model="formData" :rules="rules">
      <component
        :is="`${item.type}`"
        v-for="item in sortData"
        :key="item.name"
        :item="item"
        :name="item.name"
        @click="clickComp(item)"
      />
    </a-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import formState from './composables/useFormData';
import initialFormItem from './components/index';
import activeComp from './composables/activeComp';
import type DynamicTypes from './interface';

export default defineComponent({
  name: 'DynamicForm',
  components: { ...initialFormItem },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const { data } = toRefs(props);

    const formRef = ref();

    const validate = () => formRef.value.validate();

    const names: Record<string, unknown> = {};
    data.value.forEach((item: any) => {
      names[item.name] = '';
    });
    const formData = reactive(names);
    formState.setData(formData);

    const rules: Record<string, unknown> = {};
    data.value
      .filter((item: any) => item.rule)
      .forEach((item: any) => {
        rules[item.name as string] = item.rule;
      });

    const sortData = computed(() => {
      const arr = data.value as DynamicTypes[];
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

    const clickComp = (item: DynamicTypes) => {
      if (item.build) {
        return;
      }
      const { name } = item;
      const currComp = sortData.value.find((fi) => fi.name === name);
      activeComp.setProp(currComp);
    };

    return { formRef, sortData, validate, rules, clickComp, formData };
  },
});
</script>
