<!-- @format -->

<template>
  <table style="border: 1px solid">
    <e-table-head />
    <slot />
    <e-table-body />
  </table>
</template>

<script lang="ts">
import { defineComponent, provide, type PropType } from 'vue';
import useTable from './composables/useTable';
import ETableHead from './ETableHead.vue';
import ETableBody from './ETableBody.vue';

export default defineComponent({
  components: { ETableHead, ETableBody },
  props: {
    data: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  },
  setup(props) {
    // 提供组件属性，以供子组件调用
    provide('table', useTable(props.data));
  },
});
</script>
