<!-- @format -->

<template>
  <a-layout-content class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="$route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </a-layout-content>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useAppTagsStore } from '@/store/modules/appTags';

export default defineComponent({
  name: 'AppMain',
  setup() {
    const appTagsStore = useAppTagsStore();

    return {
      cachedViews: computed(() => appTagsStore.cachedViews),
    };
  },
});
</script>
