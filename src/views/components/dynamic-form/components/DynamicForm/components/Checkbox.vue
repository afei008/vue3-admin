<!-- @format -->

<template>
  <el-form-item :label="item.label" :prop="item.name">
    <el-checkbox-group v-model="value" name="checkboxgroup">
      <el-checkbox
        v-for="check in item.options"
        :key="check.label"
        :label="check.label"
        :value="check.value"
      />
    </el-checkbox-group>
  </el-form-item>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, watch } from 'vue';
import formState from '../composables/useFormData';

export default defineComponent({
  name: 'CheckboxComp',
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
