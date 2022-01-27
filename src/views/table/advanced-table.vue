<!-- @format -->

<template>
  <div>
    <a-button type="primary">Primary Button</a-button>
    <a-date-picker v-model:value="value1" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Dayjs } from 'dayjs';

export default defineComponent({
  name: 'AdvancedTable',
  setup() {
    const value1 = ref<Dayjs>();
    return { value1 };
  },
});
</script>
