<!-- @format -->

<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
// 官方文档说更换成了 dayjs，但实际测试并没有更换，仍然是 moment，不知是否是未更新
import moment from 'moment';
import 'moment/locale/zh-cn';
import useScrollbars from '@/composables/useScrollbars';

moment.locale('en');

export default defineComponent({
  setup() {
    const { initScrollbars } = useScrollbars({ el: 'body', x: 'hidden' });

    onMounted(() => {
      document.addEventListener('DOMContentLoaded', () => {
        initScrollbars.value();
      });
    });

    return {
      zhCN,
    };
  },
});
</script>
