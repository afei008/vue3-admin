<!-- @format -->

<template>
  <div id="path" />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { select } from 'd3';
import data from './data';
import { padding, width, height } from './config';
import useDraw from './composables/useDraw';
import usePoints from './composables/usePoints';

export default defineComponent({
  name: 'D3Scatterplot',
  setup() {
    const { points } = usePoints(data.length, 200, 5);
    const { svg } = useDraw({
      data,
      width,
      height,
      padding,
      points,
    });

    const init = () => {
      select('#path').append(() => svg.node());
    };

    onMounted(() => {
      init();
    });

    return {};
  },
});
</script>
