/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { nextTick, onMounted, ref, type Ref } from 'vue';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  TitleComponent,
  GridComponent,
  type TooltipComponentOption,
  type GridComponentOption,
} from 'echarts/components';
import { BarChart, type BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TooltipComponent,
  TitleComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | GridComponentOption | BarSeriesOption
>;

interface ChartsTypes {
  chartRef1: Ref<HTMLElement>;
  chartRef2: Ref<HTMLElement>;
  changeTabs: (e: string) => void;
}

export default function useCharts(): ChartsTypes {
  const chartRef1 = ref({} as HTMLElement);
  const chartRef2 = ref({} as HTMLElement);
  let myChart1 = null as any;
  let myChart2 = null as any;
  const option1 = ref({} as EChartsOption);
  const option2 = ref({} as EChartsOption);

  option1.value = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    title: {
      left: 'left',
      text: '销售趋势',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月',
        ],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '销售趋势',
        type: 'bar',
        barWidth: '60%',
        data: [1058, 811, 277, 824, 661, 337, 218, 1100, 558, 523, 1062, 716],
      },
    ],
  };

  option2.value = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    title: {
      left: 'left',
      text: '访问趋势',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月',
        ],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '访问趋势',
        type: 'bar',
        barWidth: '60%',
        data: [716, 1062, 523, 558, 1100, 218, 337, 661, 824, 277, 811, 1058],
      },
    ],
  };

  const initChart1 = () => {
    myChart1 = echarts.init(chartRef1.value);
    if (option1.value) {
      myChart1.setOption(option1.value);
    }
    window.addEventListener('resize', myChart1.resize);
  };

  const disposeChart1 = () => {
    window.removeEventListener('resize', myChart1.resize);
    myChart1.dispose();
  };

  const initChart2 = () => {
    myChart2 = echarts.init(chartRef2.value);
    if (option2.value) {
      myChart2.setOption(option2.value);
    }
    window.addEventListener('resize', myChart2.resize);
  };

  const disposeChart2 = () => {
    window.removeEventListener('resize', myChart2.resize);
    myChart2.dispose();
  };

  onMounted(() => {
    nextTick(() => {
      initChart1();
      initChart2();
    });
  });

  const changeTabs = (e: string) => {
    if (e === '1') {
      disposeChart1();
      initChart1();
    } else if (e === '2') {
      disposeChart2();
      initChart2();
    }
  };

  return {
    chartRef1,
    chartRef2,
    changeTabs,
  };
}
