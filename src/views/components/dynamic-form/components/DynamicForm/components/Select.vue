<!-- @format -->

<template>
  <el-form-item :label="item.label" :name="item.name">
    <el-select v-model="value" :options="item.options" placeholder="请选择">
      <el-option
        v-for="option in item.options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>
  </el-form-item>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, watch } from 'vue';
import formState from '../composables/useFormData';

export default defineComponent({
  name: 'SelectComp',
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    name: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { item, name } = toRefs(props);
    const value = ref(item.value.value);

    watch([value, props.item], (nv) => {
      formState.changeData(name.value, nv[0]);
      if (!props.item.build) {
        value.value = nv[1].value;
      }
    });

    return {
      value,
    };
  },
});
</script>
