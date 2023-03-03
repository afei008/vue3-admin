<!-- @format -->

<template>
  <el-breadcrumb class="breadcrumb">
    <el-breadcrumb-item v-for="(item, index) in routes" :key="item.path">
      <span
        v-if="item.redirect === 'noRedirect' || index == routes.length - 1"
        class="no-redirect"
      >
        {{ item.meta.title }}
      </span>
      <router-link v-else :to="item.path">
        {{ item.meta.title }}
      </router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';
import { useRoute, type RouteRecordRaw } from 'vue-router';

export default defineComponent({
  name: 'AppBreadcrumb',
  setup() {
    // 这里 ts 会提示错误，但是不影响编译，应该 ts 版本问题，之前版本不提示的
    const routes = ref<RouteRecordRaw[] | any>([]);
    const route = useRoute();

    const isDashboard = (item: RouteRecordRaw) => {
      const name = item && item.name;
      if (!name) {
        return false;
      }
      if (typeof name === 'symbol') {
        return name;
      }
      return (
        name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
      );
    };

    const getBreadcrumb = () => {
      const matched = route.matched.filter(
        (item) => item.meta && item.meta.title
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
