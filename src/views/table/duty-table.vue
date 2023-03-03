<!-- @format -->

<template>
  <div v-loading="isLoading">
    <el-button @click="clickMerge">合并</el-button>
    <el-button @click="clickSplit">拆分</el-button>
    <span>关注责任等级一列</span>
    <vxe-grid ref="grid" v-bind="gridOptions">
      <template #label="{ row }">
        <div v-for="item in row.label" :key="item.id" class="flex">
          <div class="origin">{{ item.origin }}</div>
          <div class="labels flex">
            <div v-if="item.label1" class="flex column">
              <el-tag v-for="label in item.label1" :key="label.id">
                {{ label.str }}
              </el-tag>
            </div>
            <div v-if="item.label2" class="flex column">
              <el-tag v-for="label in item.label2" :key="label.id">
                {{ label.str }}
              </el-tag>
            </div>
            <div v-if="item.label3" class="flex column">
              <el-tag v-for="label in item.label3" :key="label.id">
                {{ label.str }}
              </el-tag>
            </div>
          </div>
        </div>
      </template>
      <template #basis="{ row }">
        <p v-for="item in row.basis" :key="item.id">
          <el-tooltip v-if="item.type === 1 || item.type === 2">
            <template #content>{{ item.old }}</template>
            <span
              :class="{
                blue: item.type === 1,
                green: item.type === 2,
              }"
            >
              {{ item.str }}
            </span>
          </el-tooltip>
          <span v-else>{{ item.str }}</span>
        </p>
      </template>
      <template #pager>
        <vxe-pager
          v-model:current-page="page.currentPage"
          v-model:page-size="page.pageSize"
          background
          :total="page.totalResult"
          :layouts="page.layouts"
          @page-change="page.pageChange"
        />
      </template>
    </vxe-grid>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue';
import useDuty from './composables/useDuty';
import useDutyTable from './composables/useDutyTable';
import usePager from './composables/usePager';

export default defineComponent({
  name: 'DutyTable',
  setup() {
    const grid = ref({} as Ref);

    const mergeCells = ref([]);

    const params = ref({
      pageNum: 1,
      pageSize: 10,
    });

    const changeParams = (pages: Record<string, number>) => {
      params.value.pageNum = pages.pageNum;
      params.value.pageSize = pages.pageSize;
    };

    const { isLoading, dutyList, pages } = useDuty(params);

    const { gridOptions } = useDutyTable(dutyList);

    const { page } = usePager(pages, changeParams);

    const clickGetMerge = () => {
      mergeCells.value = grid.value.getMergeCells();
    };

    const clickMerge = () => {
      const newMergeCells = {
        row: 5,
        col: 8,
        rowspan: 3,
        colspan: 0,
      };
      grid.value.setMergeCells(newMergeCells);
    };

    const clickSplit = () => {
      // 手动记录合并的数据进行处理
      clickGetMerge();
      mergeCells.value.pop();
      grid.value.clearMergeCells();
      grid.value.setMergeCells(mergeCells.value);
    };

    return {
      grid,
      isLoading,
      gridOptions,
      page,
      clickGetMerge,
      clickMerge,
      clickSplit,
    };
  },
});
</script>

<style lang="scss" scoped>
.origin {
  flex: 0 0 80px;
}

.labels {
  flex: 1;
  justify-content: space-between;

  :deep(.ant-tag) {
    margin-bottom: 10px;
  }
}

.blue {
  color: blue;
}

.green {
  color: green;
}
</style>
