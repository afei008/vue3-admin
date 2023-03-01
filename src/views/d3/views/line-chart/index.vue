<!-- @format -->

<template>
  <div id="path">
    <div class="tooltip">
      <div><span>date: </span><strong class="date" /></div>
      <div><span>close: </span><strong class="close" /></div>
      <div><span>lower: </span><strong class="lower" /></div>
      <div><span>middle: </span><strong class="middle" /></div>
      <div><span>upper: </span><strong class="upper" /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { utcParse, csvParse, select } from 'd3';
import csv from './data.csv?raw';
import { padding, width, height } from './config';
import useScale from './composables/useScale';
import useAxis from './composables/useAxis';
import useDraw from './composables/useDraw';

const parseDate = utcParse('%Y-%m-%d');
const data = csvParse(csv, ({ date, close, lower, middle, upper }) => ({
  date: parseDate(date!) as Date,
  close: +close!,
  lower: +lower!,
  middle: +middle!,
  upper: +upper!,
}));

export default defineComponent({
  name: 'D3Linechart',
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

<style scoped>
.tooltip {
  position: absolute;
  display: none;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
}

.tooltip.show {
  display: block;
}
</style>
