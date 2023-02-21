<!-- @format -->

<template>
  <div class="color-picker">
    <div class="trigger-wrap">
      <div
        class="trigger"
        :style="{ background: `${currentColor}` }"
        @click="clickTrigger"
      />
    </div>
    <Transition name="panel">
      <div v-if="isShow" class="panel-wrap">
        <div class="panel-top">
          <picker-main :color="color" />
          <picker-slider :color="color" />
        </div>
        <div class="panel-bot">
          <div class="panel-input">
            <input v-model="currentColor" type="text" class="input" />
          </div>
          <div class="panel-btn">
            <div class="btn" @click="clickClear">清空</div>
            <div class="btn" @click="clickConfirm">确定</div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts" name="ColorPicker">
import { computed, nextTick, reactive, ref } from 'vue';
import Color from './utils/color';
import PickerMain from './components/PickerMain.vue';
import PickerSlider from './components/PickerSlider.vue';

const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits<{
  (e: 'change', value: string): void;
  (e: 'update:modelValue', value: string): void;
}>();
const color = reactive(
  new Color({
    value: props.modelValue,
  })
) as Color;

const currentColor = computed(() => {
  return !props.modelValue ? '' : color.value;
});

const resetColor = () => {
  nextTick(() => {
    if (props.modelValue) {
      color.fromString(props.modelValue);
    } else {
      color.value = '';
    }
  });
};

const isShow = ref(false);

const openPanel = () => {
  isShow.value = true;
};
const closePanel = () => {
  isShow.value = false;
};

const clickTrigger = () => {
  openPanel();
};
const clickConfirm = () => {
  closePanel();
  emit('update:modelValue', color.value);
  emit('change', color.value);
};
const clickClear = () => {
  closePanel();
  emit('change', '');
  resetColor();
};
</script>

<style lang="scss" scoped>
@import './style';
</style>
