<!-- @format -->

<template>
  <div>
    <p>基础的颜色选择器，主要难点在于各种颜色模式之间的转换</p>
    <p>此组件未做兼容处理</p>
    <color-picker v-model="colorValue" />
    {{ colorValue }}
  </div>
</template>

<script lang="ts" setup name="ColorPickerView">
import { ref } from 'vue';
import ColorPicker from '@/components/ColorPicker/index.vue';

const colorValue = ref('#ff0000');
</script>
