/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { onMounted, ref, type Ref } from 'vue';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  type TitleComponentOption,
  type ToolboxComponentOption,
  type TooltipComponentOption,
  type LegendComponentOption,
  type GridComponentOption,
} from 'echarts/components';
import {
  PieChart,
  LineChart,
  RadarChart,
  type PieSeriesOption,
  type LineSeriesOption,
  type RadarSeriesOption,
} from 'echarts/charts';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  GridComponent,
  LineChart,
  UniversalTransition,
  RadarChart,
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | PieSeriesOption
  | GridComponentOption
  | LineSeriesOption
  | RadarSeriesOption
>;

interface ChartsDemoTypes {
  chartRef: Ref<HTMLElement>;
  initChart: () => void;
  disposeChart: () => void;
}

export default function useChartsDemo(): ChartsDemoTypes {
  const chartRef = ref({} as HTMLElement);
  let myChart = null as any;
  const option = ref({} as EChartsOption);
  const cache = ref();

  option.value = {
    tooltip: { trigger: 'axis' },
    grid: [{ left: '3%', width: '33%' }],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      type: 'value',
    },
    radar: {
      indicator: [
        { name: '销售量', max: 1000 },
        { name: '行政', max: 1000 },
        { name: '信息技术', max: 1000 },
        { name: '客户支持', max: 1000 },
        { name: '开发', max: 1000 },
        { name: '营销', max: 1000 },
      ],
      radius: ['20%', '50%'],
      center: ['52%', '50%'],
      axisName: {
        color: '#333',
      },
    },
    series: [
      {
        name: '淘宝',
        data: [400, 500, 600, 700, 800, 900, 1000],
        type: 'line',
        smooth: true,
        areaStyle: {},
      },
      {
        name: '京东',
        data: [1000, 900, 800, 700, 600, 500, 400],
        type: 'line',
        smooth: true,
        areaStyle: {},
      },
      {
        name: '线下',
        data: [400, 700, 800, 1000, 900, 600, 500],
        type: 'line',
        smooth: true,
        areaStyle: {},
      },
      {
        name: '类目占比',
        type: 'pie',
        radius: ['10%', '50%'],
        center: ['83%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5,
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        data: [
          { value: 30, name: 'rose 1' },
          { value: 28, name: 'rose 2' },
          { value: 26, name: 'rose 3' },
          { value: 24, name: 'rose 4' },
          { value: 22, name: 'rose 5' },
          { value: 20, name: 'rose 6' },
          { value: 18, name: 'rose 7' },
          { value: 16, name: 'rose 8' },
        ],
      },
      {
        name: '预算与支出',
        type: 'radar',
        tooltip: {
          trigger: 'item',
        },
        data: [
          {
            value: [900, 800, 700, 700, 800, 900],
            name: '分配的预算',
          },
          {
            value: [700, 800, 900, 900, 800, 700],
            name: '实际的支出',
          },
        ],
      },
    ],
  };

  const initChart = () => {
    if (!chartRef.value) {
      chartRef.value = cache.value;
    }
    if (chartRef.value && !myChart) {
      myChart = echarts.init(chartRef.value);
      if (option.value) {
        myChart.setOption(option.value);
      }
      window.addEventListener('resize', myChart.resize);
    }
  };

  const disposeChart = () => {
    window.removeEventListener('resize', myChart.resize);
    myChart.dispose();
    myChart = null;
  };

  onMounted(() => {
    // 当 analysis 为第一个路由时，切换其他路由之后再切回来
    // dom 元素还存在，但是 chartRef 为 null
    cache.value = chartRef.value;
    initChart();
  });

  return {
    chartRef,
    initChart,
    disposeChart,
  };
}
