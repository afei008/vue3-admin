<!-- @format -->

<template>
  <div class="container">
    <p v-for="item in 50" :key="item">workplace</p>
    <right-panel child-route-name="Home" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RightPanel from '@/components/RightPanel/index.vue';

export default defineComponent({
  name: 'WorkplaceIndex',
  components: { RightPanel },
});
</script>
