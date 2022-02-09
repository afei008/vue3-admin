<!-- @format -->

<template>
  <div>
    <p>
      高德地图的调用，主要在于自定义信息窗体的实现，vue3 因为删除了 extends
      这个方法，因此实现上有点区别，具体请查看源码
    </p>
    <div id="amap" class="amap"></div>
    <a-button @click="clickChange">改变昵称</a-button>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { defineComponent } from 'vue';
import useAmap from './composables/useAmap';

export default defineComponent({
  name: 'Amap',
  setup() {
    const store = useStore();

    const { amap, amapInit } = useAmap({
      zoom: 11,
      center: [116.397428, 39.90923],
      viewMode: '3D',
    });

    const clickChange = () => {
      const nickname = ['凌大', '唐二', '张三', '李四', '王五', '朱六', '卓七'][
        Math.floor(Math.random() * 6)
      ];
      store.dispatch('userState/changeNickname', nickname);
    };

    return { amap, amapInit, clickChange };
  },
  beforeRouteEnter(to, from, next) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    next((vm: any) => {
      vm.amapInit();
    });
  },
});
</script>
<style lang="scss" scoped>
.amap {
  width: 100%;
  height: 600px;
}
</style>
