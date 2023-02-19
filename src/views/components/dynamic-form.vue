<!-- @format -->

<template>
  <p>
    封装常用表单组件，使用时只需传入表单生成对象，即可自动生成表单，更多其他类型请参考源码自行封装
  </p>
  <dynamic-form-component
    ref="dynamicRef"
    :dynamic-data="dynamicData"
    :form-data="formData"
    :rules="rules"
  />
  <p>
    <a-button type="primary" @click="getData">获取数据</a-button>
    {{ formData }}
  </p>
  <right-panel child-route-name="Form" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import DynamicFormComponent, {
  type DynamicTypes,
} from '@/components/DynamicForm/index.vue';
import RightPanel from '@/components/RightPanel/index.vue';

export default defineComponent({
  name: 'DynamicForm',
  components: {
    DynamicFormComponent,
    RightPanel,
  },
  setup() {
    const dynamicRef = ref();

    const dynamicData = reactive<DynamicTypes[]>([
      {
        type: 'Text',
        label: '文本框',
        name: 'text',
        value: null,
        attrs: {
          placeholder: '请输入',
        },
        rank: 1,
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
        value: null,
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
    const formData = reactive({
      text: '',
      select: '',
      checkbox: '',
    });

    const rules = reactive({
      text: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
    });

    const getData = () => {
      dynamicRef.value
        .validate()
        .then(() => {
          console.log(formData);
        })
        .catch((err: any) => console.log(err));
    };

    return {
      dynamicRef,
      dynamicData,
      formData,
      rules,
      getData,
    };
  },
});
</script>
