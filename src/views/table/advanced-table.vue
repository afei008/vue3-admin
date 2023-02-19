<!-- @format -->

<template>
  <a-spin :spinning="isLoading">
    <div class="form">
      <a-form
        ref="formRef"
        :model="formData"
        layout="inline"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item label="状态" name="status">
          <a-select
            ref="statusSelect"
            v-model:value="formData.status"
            placeholder="请选择"
            style="width: 100px"
            :options="statusOptions"
          />
        </a-form-item>

        <a-form-item label="操作人" name="operator">
          <a-input v-model:value="formData.operator" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">查询</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
        </a-form-item>
      </a-form>
    </div>
    <p class="checkboxs">
      <a-checkbox
        v-for="(column, index) in gridOptions.columns"
        :key="index"
        v-model:checked="column.visible"
        @change="changeColumn(column.field)"
      >
        <template v-if="index === 0">多选框</template>
        <template v-else-if="index === 1">序号</template>
        <template v-else>
          {{ column.title }}
        </template>
      </a-checkbox>
    </p>
    <div class="table">
      <vxe-grid
        v-bind="gridOptions"
        ref="gridRef"
        class="my-grid"
        @checkbox-change="gridCheckeds.checkboxChange"
        @checkbox-all="gridCheckeds.checkboxChange"
      >
        <template #operator="{ row }">
          <span>{{ row.operator }}</span>
        </template>
        <template #handle="{ row }">
          <a-button type="primary" @click="clickSetting(row.id)">
            订阅报警
          </a-button>
        </template>
        <template #pager>
          <div class="pager-left">
            <span
              >已选择 {{ gridCheckeds.records.length }} 条数据，浏览次数总计
              {{ gridCheckeds.pageviews }} 次</span
            >
          </div>
          <vxe-pager
            v-model:current-page="page.currentPage"
            v-model:page-size="page.pageSize"
            background
            :total="page.totalResult"
            :page-sizes="page.pageSizes"
            :layouts="page.layouts"
            @page-change="page.pageChange"
          />
        </template>
      </vxe-grid>
    </div>
  </a-spin>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import 'ant-design-vue/es/message/style/index';
import { OverlayScrollbars } from 'overlayscrollbars';
import useArticle from './composables/useArticle';
import useForm from './composables/useForm';
import useAdvancedTable from './composables/useAdvancedTable';
import usePager from './composables/usePager';

export default defineComponent({
  name: 'AdvancedTable',
  setup() {
    const {
      formData,
      params,
      onFinish,
      onFinishFailed,
      statusOptions,
      resetForm,
      formRef,
    } = useForm();

    const { isLoading, articleList, pages } = useArticle(params);

    const { gridRef, gridOptions, changeColumn, gridCheckeds } =
      useAdvancedTable(articleList);

    const { page } = usePager(pages, onFinish);

    const clickSetting = (id: number) => {
      message.info(`订阅成功${id}`);
    };

    onMounted(() => {
      OverlayScrollbars(
        document.querySelector('.vxe-table--body-wrapper') as HTMLElement,
        {
          scrollbars: {
            autoHide: 'leave',
          },
          overflow: {
            x: 'hidden',
          },
        }
      );
    });

    return {
      isLoading,
      gridRef,
      gridOptions,
      page,
      clickSetting,
      formRef,
      formData,
      onFinish,
      onFinishFailed,
      statusOptions,
      resetForm,
      changeColumn,
      gridCheckeds,
    };
  },
});
</script>
<style lang="scss" scoped>
.form {
  margin-bottom: 20px;
}

.table {
  height: calc(100vh - 94px - 40px - 32px - 20px);
}

.checkboxs {
  position: absolute;
  top: 0;
  right: 0;
}

.pager-left {
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
