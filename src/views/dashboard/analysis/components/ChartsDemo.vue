<!-- @format -->

<template>
  <div ref="chartRef" class="chart" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useChartsDemo from './composables/useChartsDemo';

export default defineComponent({
  setup() {
    const { chartRef, initChart, disposeChart } = useChartsDemo();

    return { chartRef, initChart, disposeChart };
  },
});
</script>
<style lang="scss" scoped>
.chart {
  height: 500px;
}
</style>
