<!-- @format -->

<template>
  <img
    class="image"
    :style="{
      width: `${nodeStyle.width}px`,
      height: `${nodeStyle.height}px`,
    }"
    :src="nodeStyle.img || avatar"
  />
</template>

<script lang="ts" setup>
import useShape from './composables/useShape';
import avatar from '@/assets/images/avatar.png';

const { nodeStyle } = useShape();
</script>
