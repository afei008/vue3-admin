<!-- @format -->

<template>
  <div class="app-container">
    <div class="overview"><overview-vue /></div>
    <div class="charts"><charts-vue ref="chartsRef" /></div>
    <div class="charts-demo">
      <charts-demo ref="chartsDemoRef" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue';
import OverviewVue from './components/Overview.vue';
import ChartsVue from './components/Charts.vue';
import ChartsDemo from './components/ChartsDemo.vue';

export default defineComponent({
  name: 'AnalysisIndex',
  components: { OverviewVue, ChartsVue, ChartsDemo },
  beforeRouteEnter(to, from, next) {
    next((vm: any) => {
      nextTick(() => {
        vm.chartsDemoRef.initChart();
      });
    });
  },
  beforeRouteLeave() {
    this.chartsDemoRef.disposeChart();
  },
  setup() {
    const chartsRef = ref();
    const chartsDemoRef = ref();
    return {
      chartsRef,
      chartsDemoRef,
    };
  },
});
</script>
<style lang="scss" scoped>
.app-container {
  min-height: calc(100vh - 94px);
  margin: -20px;
  background: #f0f2f5;
}

.charts {
  margin: 20px 0;
}

.charts-demo {
  height: 500px;
}
</style>
