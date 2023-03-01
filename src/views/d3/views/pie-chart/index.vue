<!-- @format -->

<template>
  <div id="path" />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { select } from 'd3';
import data from './data';
import { width, height } from './config';
import useDraw from './composables/useDraw';

export default defineComponent({
  name: 'D3Piechart',
  setup() {
    const { svg } = useDraw({ data, width, height });

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
