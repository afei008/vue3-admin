<!-- @format -->

<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { OverlayScrollbars } from 'overlayscrollbars';

dayjs.locale('zh-cn');

export default defineComponent({
  setup() {
    OverlayScrollbars(document.body, {
      scrollbars: {
        autoHide: 'leave',
      },
      overflow: {
        x: 'hidden',
      },
    });

    return {
      zhCN,
    };
  },
});
</script>
