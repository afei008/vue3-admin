<!-- @format -->

<template>
  <div class="panel-slider">
    <div ref="barRef" class="panel-slider-bar" @click="handleClick" />
    <div
      ref="pointRef"
      class="panel-slider-point"
      :style="{ top: `${pointTop}px` }"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, getCurrentInstance, computed, watch } from 'vue';
import type Color from '../utils/color';
import draggable from '../utils/draggable ';

const props = defineProps<{ color: Color }>();

const instance = getCurrentInstance();
const pointRef = ref<HTMLElement>();
const barRef = ref<HTMLElement>();
const pointTop = ref(0);
const hueValue = computed(() => {
  return props.color.get('hue');
});

function handleDrag(event: MouseEvent) {
  if (!barRef.value || !pointRef.value) {
    return;
  }

  const el = instance?.vnode.el as HTMLElement;
  const rect = el.getBoundingClientRect();
  const { clientY } = event;
  let top = clientY - rect.top;
  top = Math.min(top, rect.height - pointRef.value.offsetHeight / 2);
  top = Math.max(pointRef.value.offsetHeight / 2, top);
  const hue = Math.round(
    ((top - pointRef.value.offsetHeight / 2) /
      (rect.height - pointRef.value.offsetHeight)) *
      360
  );
  props.color.set('hue', hue);
}

function handleClick(event: MouseEvent) {
  const { target } = event;
  if (target !== pointRef.value) {
    handleDrag(event);
  }
}

function getPointTop() {
  if (!pointRef.value || !instance) {
    return 0;
  }
  const el = instance.vnode.el as HTMLElement;
  const hue = props.color.get('hue');
  if (!el) return 0;
  return Math.round(
    (hue * (el.offsetHeight - pointRef.value.offsetHeight / 2)) / 360
  );
}
function update() {
  pointTop.value = getPointTop();
}

watch(
  () => hueValue.value,
  () => {
    update();
  }
);

onMounted(() => {
  if (!barRef.value || !pointRef.value) {
    return;
  }
  const dragConfig = {
    drag: (event: MouseEvent) => {
      handleDrag(event);
    },
    end: (event: MouseEvent) => {
      handleDrag(event);
    },
  };
  draggable(barRef.value, dragConfig);
  draggable(pointRef.value, dragConfig);
  update();
});
</script>

<style lang="scss" scoped>
.panel-slider {
  position: relative;

  .panel-slider-bar {
    width: 12px;
    height: 100%;
    background: linear-gradient(
      180deg,
      red 0,
      #ff0 17%,
      #0f0 33%,
      #0ff 50%,
      #00f 67%,
      #f0f 83%,
      red
    );
  }

  .panel-slider-point {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 1px;
    box-shadow: 0 0 2px #0009;
  }
}
</style>
