<!-- @format -->

<template>
  <div ref="contentRef">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Clipboard',
  setup() {
    const contentRef = ref();

    const success = () => {
      message.success('复制成功');
    };

    const hasInput = (nodes: Array<Element>) => {
      // 当存在表单元素时，如果要保留其他元素的格式，可使用 selection 对象的 focusNodes 属性进行遍历操作，但感觉比较复杂，因此此处不保留格式返回
      const str = nodes
        .map(
          (item: Element) => (item as HTMLInputElement)?.value?.trim()
            || item?.textContent?.trim(),
        )
        .filter((item) => item)
        .join('\n');
      return str;
    };

    const noInput = () => {
      const content = contentRef.value;
      const range = new Range();
      const selection = window.getSelection();
      selection?.removeAllRanges();
      range.selectNodeContents(content);
      selection?.addRange(range);
      return selection;
    };

    const copy = () => {
      const content = contentRef.value;
      let result: string | Selection | null;
      const nodes = Array.prototype.slice.call(content.childNodes);
      if (
        nodes.some(
          (item: Element) => item.nodeName.toLocaleUpperCase() === 'INPUT',
        )
      ) {
        result = hasInput(nodes);
      } else {
        result = noInput();
      }
      if (navigator.clipboard) {
        (navigator as Navigator).clipboard
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .writeText(result as any)
          .then(() => {
            success();
          })
          .catch((err) => console.log(err));
      } else {
        document.execCommand('copy');
        success();
      }
      if (typeof result !== 'string') {
        result?.removeAllRanges();
      }
    };

    return {
      contentRef,
      copy,
    };
  },
});
</script>
