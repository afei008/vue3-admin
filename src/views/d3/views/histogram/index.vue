<!-- @format -->

<template>
  <div id="path" />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { select } from 'd3';
import data from './data';
import { padding, width, height } from './config';
import useScale from './composables/useScale';
import useAxis from './composables/useAxis';
import useDraw from './composables/useDraw';

export default defineComponent({
  name: 'D3Histogram',
  setup() {
    const { xScale, yScale } = useScale({ data, width, height, padding });
    const { axis } = useAxis({ width, height, padding, xScale, yScale });
    const { svg } = useDraw({ data, width, height, padding, xScale, yScale });

    const init = () => {
      select('#path')
        .append(() => svg.node())
        .append(() => axis.node());
    };

    onMounted(() => {
      init();
    });

    return {};
  },
});
</script>
