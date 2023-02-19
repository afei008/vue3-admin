<!-- @format -->

<template>
  <div class="grid-layout">
    <grid-layout />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GridLayout from '@/components/GridLayout/index.vue';

export default defineComponent({
  name: 'DragLayout',
  components: { GridLayout },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.grid-layout {
  height: 100%;
}
</style>
