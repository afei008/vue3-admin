<!-- @format -->
<template>
  <div>
    <div id="editor"></div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  defineComponent, nextTick, onMounted, ref, toRefs,
} from 'vue';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

export default defineComponent({
  name: 'TuiEditor',
  props: {
    initialValue: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { initialValue } = toRefs(props);

    const editor = ref(null as any);

    const createEditor = () => {
      nextTick(() => {
        editor.value = new (Editor.factory as any)({
          el: document.querySelector('#editor') as HTMLElement,
          height: '300px',
          viewer: true,
          initialValue: initialValue.value,
        });
      });
    };

    onMounted(() => {
      createEditor();
    });

    return {};
  },
});
</script>
