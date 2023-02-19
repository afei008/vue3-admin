<!-- @format -->

<template>
  <a-row class="row">
    <a-col v-for="item in 4" :key="item" class="col">
      <a-card class="card">
        <div class="head">
          <div class="meta flex jb">
            <span>总销售额</span>
            <span>
              <a-tooltip>
                <template #title>数据说明</template>
                <info-circle-outlined />
              </a-tooltip>
            </span>
          </div>
          <div class="total">￥126,560</div>
        </div>
        <div class="body flex jb ae">
          <span class="tip-up flex inline ac"
            >周同比 <span class="data">{{ 12 }}%</span>
          </span>
          <span class="tip-down flex inline ac"
            >日同比 <span class="data">{{ 11 }}%</span>
          </span>
        </div>
        <div class="foot">
          <span>日均销售额￥234.56</span>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { InfoCircleOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'OverviewIndex',
  components: { InfoCircleOutlined },
});
</script>

<style lang="scss" scoped>
.row {
  gap: 20px;
}

.col {
  flex: auto;
}

:deep(.card) {
  .ant-card-body {
    padding-bottom: 10px;
  }
}

.body {
  height: 45px;
}

.tip-up,
.tip-down {
  &::after {
    margin-top: calc(6px * var(--i));
    margin-left: 5px;
    content: '';
    border-style: solid;
    border-width: 6px;
  }

  .data {
    margin-left: 10px;
  }
}

.tip-up::after {
  --i: -1;

  border-color: transparent transparent var(--primary-color) transparent;
}

.tip-down::after {
  --i: 1;

  border-color: var(--secondary-color) transparent transparent transparent;
}

.meta {
  color: rgba(0, 0, 0, 0.45);
}

.total {
  font-size: 30px;
}

.foot {
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1px solid #ddd;
}
</style>
