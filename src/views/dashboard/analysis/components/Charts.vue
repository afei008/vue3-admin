<!-- @format -->

<template>
  <a-tabs class="tabs" :animated="true" @change="changeTabs">
    <a-tab-pane key="1" tab="销售额" :forceRender="true">
      <a-row>
        <a-col :span="16">
          <div class="chart" ref="chartRef1"></div>
        </a-col>
        <a-col :span="8" class="wrap">
          <h4>门店销售额排名</h4>
          <ul class="list">
            <li class="item flex jb" v-for="item in listData" :key="item.title">
              <span class="title">{{ item.title }}</span>
              <span>{{ item.total }}</span>
            </li>
          </ul>
        </a-col>
      </a-row>
    </a-tab-pane>
    <a-tab-pane key="2" tab="访问量" :forceRender="true">
      <a-row>
        <a-col :span="16">
          <div class="chart" ref="chartRef2"></div>
        </a-col>
        <a-col :span="8" class="wrap">
          <h4>门店访问量排名</h4>
          <ul class="list">
            <li class="item flex jb" v-for="item in listData" :key="item.title">
              <span class="title">{{ item.title }}</span>
              <span>{{ item.total }}</span>
            </li>
          </ul>
        </a-col>
      </a-row>
    </a-tab-pane>
    <template #rightExtra>
      <a-button type="link">今日</a-button>
      <a-button type="link">本周</a-button>
      <a-button type="link">本月</a-button>
      <a-button type="link">全年</a-button>
      <a-range-picker v-model:value="value" />
    </template>
  </a-tabs>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Dayjs } from 'dayjs';
import useCharts from './composables/useCharts';

type RangeValue = [Dayjs, Dayjs];

export default defineComponent({
  setup() {
    const { chartRef1, chartRef2, changeTabs } = useCharts();

    const listData = [
      { title: '超级大卖场1号店', total: 1234.56 },
      { title: '超级大卖场2号店', total: 1134.56 },
      { title: '超级大卖场3号店', total: 1034.56 },
      { title: '超级大卖场4号店', total: 934.56 },
      { title: '超级大卖场5号店', total: 834.56 },
      { title: '超级大卖场6号店', total: 734.56 },
      { title: '超级大卖场7号店', total: 634.56 },
    ];

    return {
      value: ref<RangeValue>(),
      chartRef1,
      chartRef2,
      changeTabs,
      listData,
    };
  },
});
</script>
<style lang="scss" scoped>
.tabs {
  background: #fff;
}
:deep(.ant-tabs-nav) {
  padding: 0 20px;
}
:deep(.ant-tabs-content-holder) {
  padding: 5px 20px 20px;
}
.chart {
  min-height: 300px;
}
.wrap {
  padding-left: 30px;
  h4 {
    font-weight: 700;
  }
  .list {
    counter-reset: count;
  }
  .item {
    margin-top: 15px;
    &::before {
      counter-increment: count;
      content: counter(count);
      border-radius: 50%;
      background: #f5f5f5;
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
    }
    &:nth-child(-n + 3) {
      &::before {
        background: #333;
        color: #fff;
      }
    }
    .title {
      margin-left: 20px;
      margin-right: auto;
    }
  }
}
</style>
