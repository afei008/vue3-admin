<!-- @format -->

<template>
  <div class="app-container">
    <div class="overview"><overview-vue></overview-vue></div>
    <div class="charts"><charts-vue ref="chartsRef"></charts-vue></div>
    <div class="charts-demo">
      <charts-demo ref="chartsDemoRef"></charts-demo>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue';
import OverviewVue from './components/Overview.vue';
import ChartsVue from './components/Charts.vue';
import ChartsDemo from './components/ChartsDemo.vue';

export default defineComponent({
  name: 'Analysis',
  components: { OverviewVue, ChartsVue, ChartsDemo },
  setup() {
    const chartsRef = ref();
    const chartsDemoRef = ref();
    return {
      chartsRef,
      chartsDemoRef,
    };
  },
  beforeRouteEnter(to, from, next) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    next((vm: any) => {
      nextTick(() => {
        vm.chartsDemoRef.initChart();
      });
    });
  },
  beforeRouteLeave() {
    this.chartsDemoRef.disposeChart();
  },
});
</script>
<style lang="scss" scoped>
.app-container {
  margin: -20px;
  background: #f0f2f5;
  min-height: calc(100vh - 94px);
}
.charts {
  margin: 20px 0;
}
.charts-demo {
  height: 500px;
}
</style>
