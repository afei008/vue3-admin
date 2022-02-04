<!-- @format -->

<template>
  <div class="container">
    <p v-for="item in 10" :key="item">workplace</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Workplace',
});
</script>
