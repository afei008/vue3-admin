<!-- @format -->

<template>
  <div
    class="circle"
    :style="{
      display: 'flex',
      alignItems: `${nodeStyle.alignItems}`,
      justifyContent: `${nodeStyle.justifyContent}`,
      width: `${nodeStyle.width}px`,
      height: `${nodeStyle.height}px`,
      background: `${nodeStyle.fill}`,
      fontSize: `${nodeStyle.fontSize}px`,
      color: `${nodeStyle.color}`,
    }"
  >
    {{ nodeStyle.label }}
  </div>
</template>

<script lang="ts" setup>
import useShape from './composables/useShape';

const { nodeStyle } = useShape();
</script>

<style scoped>
.circle {
  border-radius: 50%;
}
</style>
