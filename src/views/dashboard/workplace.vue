<!-- @format -->

<template>
<p v-for="item in 100" :key="item">workplace</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Workplace',
});
</script>
