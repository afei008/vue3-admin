<!-- @format -->

<template>
  <div class="container">
    <p v-for="item in 10" :key="item">workplace</p>
    <right-panel childRouteName="Home"></right-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RightPanel from '@/components/RightPanel/index.vue';

export default defineComponent({
  name: 'Workplace',
  components: { RightPanel },
});
</script>
