<!-- @format -->

<template>
  <a-form-item :label="item.label" :name="item.name">
    <a-input v-model:value="value" :placeholder="item.attrs.placeholder" />
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, watch } from 'vue';
import formState from '../composables/useFormData';

export default defineComponent({
  name: 'TextComp',
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
