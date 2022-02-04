<!-- @format -->

<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import useScrollbars from '@/composables/useScrollbars';

// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

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
