<!-- @format -->

<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
// 官方文档说更换成了 dayjs，但实际测试并没有更换，仍然是 moment，不知是否是未更新
import moment from 'moment';
import 'moment/locale/zh-cn';
import OverlayScrollbars from 'overlayscrollbars';

moment.locale('en');

export default defineComponent({
  setup() {
    return {
      zhCN,
    };
  },
  mounted() {
    document.addEventListener('DOMContentLoaded', () => {
      OverlayScrollbars(document.querySelectorAll('body'), {
        scrollbars: {
          autoHide: 'leave',
          visibility: 'auto',
        },
        overflowBehavior: {
          x: 'hidden',
        },
      });
    });
  },
});
</script>
