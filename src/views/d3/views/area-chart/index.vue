<!-- @format -->

<template>
  <div id="path" />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { csvParse, select, utcParse } from 'd3';
import csv from './data.csv?raw';
import { padding, width, height } from './config';
import useScale from './composables/useScale';
import useAxis from './composables/useAxis';
import useDraw from './composables/useDraw';

const parseDate = utcParse('%Y-%m-%d');
const data = csvParse(csv, ({ date, close, lower, middle, upper }) => ({
  date: parseDate(date!),
  close: +close!,
  lower: +lower!,
  middle: +middle!,
  upper: +upper!,
}));

export default defineComponent({
  name: 'D3Areachart',
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
