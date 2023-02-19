<!-- @format -->

<template>
  <i :class="`iconfont ${type}`" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '@/assets/font/iconfont.css';

// 本来打算通过 antd 的 iconfont 方法创建组件的，但是在引用本地 js 文件的过程中
// 1. 通过 import 引入 js 文件会提示`<`这个错误，引用线上文件正常
// 2. 通过 path 或 fs 引用路径时，会提示找不到模块，已安装 @type/node，但仍然无法解决

export default defineComponent({
  name: 'IconFont',
  props: {
    type: {
      type: String,
      default: '',
    },
  },
});
</script>
