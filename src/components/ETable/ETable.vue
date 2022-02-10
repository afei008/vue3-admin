<!-- @format -->

<template>
  <table border="1">
    <e-table-head></e-table-head>
    <slot></slot>
    <e-table-body></e-table-body>
  </table>
</template>

<script lang="ts">
import { defineComponent, provide, PropType } from 'vue';
import useTable from './composables/useTable';
import ETableHead from './ETableHead.vue';
import ETableBody from './ETableBody.vue';

export default defineComponent({
  components: { ETableHead, ETableBody },
  props: {
    data: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: Array as PropType<any[]>,
      default: () => [],
    },
  },
  setup(props) {
    // 注入组件属性，以供子组件调用
    provide('table', useTable(props.data));
  },
});
</script>
