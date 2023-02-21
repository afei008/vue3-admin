<!-- @format -->

<template>
  <div
    ref="panelRef"
    class="panel-main"
    :style="{ background: `${background}` }"
  >
    <div class="panel-white" />
    <div class="panel-black" />
    <div
      class="panel-point"
      :style="{ left: `${cursorLeft}px`, top: `${cursorTop}px` }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, computed, watch } from 'vue';
import type Color from '../utils/color/color';
import draggable from '../utils/draggable ';

const props = defineProps<{
  color: Color;
}>();

const instance = getCurrentInstance();
const panelRef = ref<HTMLElement>();
const cursorLeft = ref(0);
const cursorTop = ref(0);
const background = ref('hsl(0, 100%, 50%)');
const colorValue = computed(() => {
  const hue = props.color.get('hue');
  const value = props.color.get('value');
  return { hue, value };
});

function update() {
  if (!instance) {
    return;
  }
  const saturation = props.color.get('saturation');
  const value = props.color.get('value');
  const el = instance.vnode.el!;
  const { clientWidth: width, clientHeight: height } = el;
  cursorLeft.value = (saturation * width) / 100;
  cursorTop.value = ((100 - value) * height) / 100;
  background.value = `hsl(${props.color.get('hue')}, 100%, 50%)`;
}

function handleDrag(event: MouseEvent) {
  const el = instance?.vnode.el as HTMLElement;
  const rect = el.getBoundingClientRect();
  const { clientX, clientY } = event;
  let left = clientX - rect.left;
  let top = clientY - rect.top;
  left = Math.max(0, left);
  left = Math.min(left, rect.width);
  top = Math.max(0, top);
  top = Math.min(top, rect.height);
  cursorLeft.value = left;
  cursorTop.value = top;
  props.color.set({
    saturation: (left / rect.width) * 100,
    value: 100 - (top / rect.height) * 100,
  });
}

watch(
  () => colorValue.value,
  () => {
    update();
  }
);

onMounted(() => {
  if (!panelRef.value) {
    return;
  }

  draggable(panelRef.value, {
    drag: (event) => {
      handleDrag(event);
    },
    end: (event) => {
      handleDrag(event);
    },
  });

  update();
});
</script>
<style lang="scss" scoped>
.panel-main {
  position: relative;
  width: 300px;
  height: 200px;

  .panel-point {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px #0000004d, 0 0 1px 2px #0006;
  }

  .panel-white,
  .panel-black {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .panel-white {
    background: linear-gradient(90deg, #fff, transparent);
  }

  .panel-black {
    background: linear-gradient(0deg, #000, transparent);
  }
}
</style>
