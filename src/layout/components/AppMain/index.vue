<!-- @format -->

<template>
  <a-layout-content class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </a-layout-content>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
  name: 'AppMain',
  setup() {
    const store = useStore();

    return {
      cachedViews: computed(() => store.getters['appTagsState/cachedViews']),
    };
  },
});
</script>
