<!-- @format -->

<template>
  <p>tinymce 富文本编辑器</p>
  <tinymce-editor v-model="content" :height="400" />

  <div v-html="content" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TinymceEditor from '@/components/TinymceEditor/index.vue';

export default defineComponent({
  name: 'TinymceView',
  components: {
    TinymceEditor,
  },
  setup() {
    const content = ref();

    return {
      content,
    };
  },
});
</script>
