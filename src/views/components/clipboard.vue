<!-- @format -->

<template>
  <el-row>
    <el-col :span="24" class="col-24">
      <el-row>
        <el-col :span="4">没有input元素</el-col>
        <el-col :span="10">
          <clipboard-component ref="clipboardRef">
            <p>this is message1</p>
            <p>this is message2</p>
            this is message 3 this is message 4
          </clipboard-component>
        </el-col>
        <el-col :span="10">
          <el-button @click="clickCopy">复制</el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24" class="col-24">
      <el-row>
        <el-col :span="4">含有input元素</el-col>
        <el-col :span="10">
          <clipboard-component ref="clipboardRef2">
            <p>this is message1</p>
            <p>this is message2</p>
            this is message 3 this is message 4
            <el-input v-model="value" />
            this is message 5
            <el-input v-model="textareValue" type="textarea" />
            <textarea id="" name="" cols="30" rows="10">123123123</textarea>
          </clipboard-component>
        </el-col>
        <el-col :span="10">
          <el-button @click="clickCopy2">复制</el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ClipboardComponent from '@/components/Clipboard/index.vue';

export default defineComponent({
  name: 'ClipboardView',
  components: { ClipboardComponent },
  setup() {
    const clipboardRef = ref();
    const clickCopy = () => {
      clipboardRef.value.copy();
    };
    const clipboardRef2 = ref();
    const clickCopy2 = () => {
      clipboardRef2.value.copy();
    };

    const value = ref('this is input message');
    const textareValue = ref('this is textarea message');
    return {
      clickCopy,
      clipboardRef,
      clickCopy2,
      clipboardRef2,
      value,
      textareValue,
    };
  },
});
</script>
<style lang="scss" scoped>
.col-24 {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
}
</style>
