<!-- @format -->

<script lang="ts">
import { defineComponent, inject } from 'vue';
import type { StateTypes } from './composables/useTable';

export default defineComponent({
  props: {
    prop: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    // 此组件主要用来获取 columns 和 slots，自身并不展示
    const { setColumns, setSlots } = inject('table') as StateTypes;
    setColumns({ label: props.label, prop: props.prop });
    const { slots } = context;
    if (slots && slots.default) {
      setSlots(`${props.prop}`, slots.default);
    }
  },
  render() {
    return null;
  },
});
</script>
