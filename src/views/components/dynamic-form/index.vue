<!-- @format -->

<template>
  <div class="dynamic-form">
    <div class="head">
      <el-button type="primary" @click="clickAddInput">新增文本框</el-button>
      <el-button type="primary" @click="clickModal('data')"
        >表单返回值</el-button
      >
      <el-button type="primary" @click="clickModal('config')">预览</el-button>
    </div>
    <div class="body flex">
      <div class="left">
        <p>
          封装常用表单组件，使用时只需传入表单生成对象，即可自动生成表单，更多其他类型请参考源码自行封装
        </p>
        <dynamic-form-component ref="dynamicRef" :data="data" />
      </div>
      <div class="right shadow bg-white">
        <sidebar-comp :data="data" />
      </div>
    </div>
    <el-dialog v-model="visible" title="请自行格式化代码查看">
      {{ modalData }}
    </el-dialog>
    <el-dialog v-model="show" title="实际效果" :destroy-on-close="true">
      <dynamic-form-component ref="dynamicRef" :data="buildData" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import DynamicFormComponent from './components/DynamicForm/index.vue';
import type DynamicTypes from './components/DynamicForm/interface';
import SidebarComp from './components/SidebarComp.vue';

export default defineComponent({
  name: 'DynamicForm',
  components: {
    DynamicFormComponent,
    SidebarComp,
  },
  setup() {
    const dynamicRef = ref();

    const data = reactive<DynamicTypes[]>([
      {
        type: 'Text',
        label: '文本框',
        name: 'text',
        value: null,
        attrs: {
          placeholder: '请输入',
        },
        rank: 1,
        rule: [{ required: true, message: '请输入内容', trigger: 'blur' }],
      },
      {
        type: 'Select',
        label: '下拉列表',
        name: 'select',
        value: null,
        options: [
          {
            value: 'jack',
            label: 'Jack',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'yiminghe',
            label: 'Yiminghe',
          },
        ],
        attrs: {
          placeholder: '请选择',
        },
        rank: 2,
      },
      {
        type: 'Checkbox',
        label: '多选框',
        name: 'checkbox',
        value: ['选项一'],
        options: [
          {
            value: '111',
            label: '选项一',
          },
          {
            value: '222',
            label: '选项二',
          },
        ],
        attrs: {
          placeholder: '请选择',
        },
        rank: 3,
      },
    ]);
    const buildData = ref<DynamicTypes[]>([]);

    const modalData = ref('');
    const visible = ref(false);
    const show = ref(false);

    const clickModal = (type: string) => {
      if (type === 'config') {
        buildData.value = data.map((item) => {
          const obj = { ...item };
          obj.build = true;
          return obj;
        });
        show.value = true;
      } else if (type === 'data') {
        dynamicRef.value.validate().then((res: any) => {
          modalData.value = res;
          visible.value = true;
        });
      }
    };

    const clickAddInput = () => {
      data.push({
        type: 'Text',
        label: '文本框',
        name: `text${data.length + 1}`,
        value: null,
        attrs: {
          placeholder: '请输入',
        },
        rank: Infinity,
      });
    };

    return {
      dynamicRef,
      data,
      buildData,
      modalData,
      visible,
      show,
      clickModal,
      clickAddInput,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './style';
</style>
