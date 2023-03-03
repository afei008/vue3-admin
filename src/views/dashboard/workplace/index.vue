<!-- @format -->

<template>
  <div class="container">
    <p v-for="item in 50" :key="item">workplace</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WorkplaceIndex',
});
</script>
