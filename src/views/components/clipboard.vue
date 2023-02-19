<!-- @format -->

<template>
  <a-row>
    <a-col :span="24" class="col-24">
      <a-row>
        <a-col :span="4">没有input元素</a-col>
        <a-col :span="10">
          <clipboard-component ref="clipboardRef">
            <p>this is message1</p>
            <p>this is message2</p>
            this is message 3 this is message 4
          </clipboard-component>
        </a-col>
        <a-col :span="10">
          <a-button @click="clickCopy">复制</a-button>
        </a-col>
      </a-row>
    </a-col>
    <a-col :span="24" class="col-24">
      <a-row>
        <a-col :span="4">含有input元素</a-col>
        <a-col :span="10">
          <clipboard-component ref="clipboardRef2">
            <p>this is message1</p>
            <p>this is message2</p>
            this is message 3 this is message 4
            <a-input v-model:value="value" />
            this is message 5
            <a-textarea v-model:value="textareValue" />
            <textarea id="" name="" cols="30" rows="10">123123123</textarea>
          </clipboard-component>
        </a-col>
        <a-col :span="10">
          <a-button @click="clickCopy2">复制</a-button>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
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
