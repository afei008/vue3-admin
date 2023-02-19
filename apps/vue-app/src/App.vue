<!-- @format -->

<template>
  <div class="container">
    <div id="nav">
      <a
        class="link"
        :class="currRoute === item.path ? 'active' : ''"
        @click="goto(`${String(item.name)}`)"
        v-for="item in routes"
        :key="item.path"
      >
        {{ item?.meta?.title }}
      </a>
    </div>
    <div class="body">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useMicroApp from './composables/useMicroApp';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const allRoutes = router.getRoutes();
    const currRoute = ref('');

    const routes = allRoutes
      .filter((item) => item.name)
      .sort((a, b) => {
        // 在基座应用中，返回的路由顺序与子应用中的不同，为了保持一致，因此加入一个顺序号
        const obj1 = a.meta as { sort: number };
        const obj2 = b.meta as { sort: number };
        if (obj1?.sort === obj2?.sort) {
          return 0;
        }
        return obj1?.sort > obj2?.sort ? 1 : -1;
      });

    const goto = (name: string) => {
      router.push({ name });
    };

    useMicroApp();

    watch(route, (nv) => {
      currRoute.value = nv.path;
    });

    return {
      goto,
      routes,
      currRoute,
    };
  },
});
</script>

<style lang="scss" scoped>
#nav {
  position: sticky;
  top: 0px;
  margin-left: -52px;
  margin-right: -20px;
  padding: 20px;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.2);
  z-index: 1;
}
.link {
  padding: 0 20px;
  cursor: pointer;
  &.active {
    background: var(--primary-color);
    color: #fff;
  }
}
</style>
