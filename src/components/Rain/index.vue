<!-- @format -->

<template>
  <div ref="rainRef" class="rain" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'RainComp',
  setup() {
    const rainRef = ref({} as HTMLElement);
    const createRain = () => {
      const amount = 100;
      const frag = document.createDocumentFragment();
      for (let i = 0; i < amount; i += 1) {
        const el = document.createElement('i');
        el.classList.add('i');

        const width = Math.random() * 5;
        const left = Math.floor(Math.random() * window.innerWidth);
        const delay = Math.random() * -20;
        const duration = Math.random() * 5;

        el.style.width = `${0.2 + width}px`;
        el.style.left = `${left}px`;
        el.style.animationDelay = `${delay}s`;
        el.style.animationDuration = `${duration}s`;
        frag.appendChild(el);
      }
      rainRef.value?.appendChild(frag);
    };

    onMounted(() => {
      createRain();
    });
    return {
      rainRef,
    };
  },
});
</script>

<style lang="scss">
.rain {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: hidden;
  pointer-events: none;

  .i {
    position: absolute;
    height: 200px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    animation: rain 3s linear infinite;

    &:nth-child(4n + 1) {
      background: linear-gradient(transparent, var(--primary-color));
    }

    &:nth-child(4n + 2) {
      background: linear-gradient(transparent, var(--secondary-color));
    }

    &:nth-child(4n + 3) {
      background: linear-gradient(transparent, deeppink);
    }

    &:nth-child(4n + 4) {
      background: linear-gradient(transparent, deepskyblue);
    }
  }
  @keyframes rain {
    0% {
      transform: translateY(-200px);
    }

    100% {
      transform: translateY(calc(100vh + 200px));
    }
  }
}
</style>
