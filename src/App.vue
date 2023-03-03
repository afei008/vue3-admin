<!-- @format -->

<template>
  <el-config-provider :locale="zhCN">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// @ts-ignore ---
import zhCN from 'element-plus/dist/locale/zh-cn.mjs';
import { OverlayScrollbars } from 'overlayscrollbars';

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
