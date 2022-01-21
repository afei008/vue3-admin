<!-- @format -->

<template>
  <a-breadcrumb :routes="routes">
    <template #itemRender="{ route, paths }">
      <span v-if="routes.indexOf(route) === routes.length - 1">
        {{ route.meta.title }}
      </span>
      <router-link v-else :to="`/${paths.join('/')}`">
        {{ route.meta.title }}
      </router-link>
    </template>
  </a-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'AppBreadcrumb',
  setup() {
    const routes = ref<any>([]);
    const route = useRoute();

    const isDashboard = (item: any) => {
      const name = item && item.name;
      if (!name) {
        return false;
      }
      return (
        name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
      );
    };

    const getBreadcrumb = () => {
      const matched = route.matched.filter(
        (item) => item.meta && item.meta.title,
      );
      const first = matched[0];
      let target: any[] = [];
      if (!isDashboard(first)) {
        target = [{ path: '/', meta: { title: '主页' } }, ...matched];
      }
      routes.value = target.filter((item) => item.meta && item.meta.title);
    };

    getBreadcrumb();

    watch(route, getBreadcrumb);

    return {
      routes,
    };
  },
});
</script>
