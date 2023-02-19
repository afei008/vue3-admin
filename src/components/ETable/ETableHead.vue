<!-- @format -->

<template>
  <thead>
    <th v-for="(item, index) in columns" :key="index">{{ item.label }}</th>
  </thead>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import type { StateTypes } from './composables/useTable';

export default defineComponent({
  setup() {
    // 获取 columns，用于展示表头
    const { state } = inject('table') as StateTypes;
    return { columns: state.columns };
  },
});
</script>
