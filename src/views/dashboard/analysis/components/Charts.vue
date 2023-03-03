<!-- @format -->

<template>
  <el-card class="tabs-wrap">
    <el-tabs class="tabs bg-white" @tab-change="changeTabs">
      <el-tab-pane key="1" label="销售额" :force-render="true">
        <el-row>
          <el-col :span="16">
            <div ref="chartRef1" class="chart" />
          </el-col>
          <el-col :span="8" class="wrap">
            <h4>门店销售额排名</h4>
            <ul class="list">
              <li
                v-for="item in listData"
                :key="item.title"
                class="item flex jb"
              >
                <span class="title">{{ item.title }}</span>
                <span>{{ item.total }}</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane key="2" label="访问量" :force-render="true">
        <el-row>
          <el-col :span="16">
            <div ref="chartRef2" class="chart" />
          </el-col>
          <el-col :span="8" class="wrap">
            <h4>门店访问量排名</h4>
            <ul class="list">
              <li
                v-for="item in listData"
                :key="item.title"
                class="item flex jb"
              >
                <span class="title">{{ item.title }}</span>
                <span>{{ item.total }}</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <div class="date-picker flex ac">
      <el-button size="small">今日</el-button>
      <el-button size="small">本周</el-button>
      <el-button size="small">本月</el-button>
      <el-button size="small">全年</el-button>
      <el-date-picker
        v-model="value"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="small"
      />
    </div>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Dayjs } from 'dayjs';
import useCharts from './composables/useCharts';

type RangeValue = [Dayjs, Dayjs];

export default defineComponent({
  name: 'ChartsComp',
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
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      content: counter(count);
      counter-increment: count;
      background: #f5f5f5;
      border-radius: 50%;
    }

    &:nth-child(-n + 3) {
      &::before {
        color: #fff;
        background: #333;
      }
    }

    .title {
      margin-right: auto;
      margin-left: 20px;
    }
  }
}

.tabs-wrap {
  position: relative;
}

.date-picker {
  position: absolute;
  top: 20px;
  right: 20px;

  & > :last-child {
    margin-left: 10px;
  }
}
</style>
