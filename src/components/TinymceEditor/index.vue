<!-- @format -->

<template>
  <editor
    ref="editorRef"
    v-model="content"
    :init="editorInit"
    tinymce-script-src="/tinymce/tinymce.min.js"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from 'vue';
import Editor from '@tinymce/tinymce-vue';
import API from '@/api';

export default defineComponent({
  name: 'TinymceEditor',
  components: {
    Editor,
  },
  model: {
    porp: 'msg',
    event: 'cc',
  },
  props: {
    msg: null,
    width: {
      type: [Number, String],
      default: '100%',
    },
    height: {
      type: [Number, String],
      default: 300,
    },
  },
  setup(props, context) {
    const { width, height } = toRefs(props);
    const content = ref();

    const imgUpload = (
      blobInfo: Record<string, unknown>,
      success: (url: string) => void,
      failure: (err: unknown) => void
    ) => {
      API.fileUpload({ blobInfo })
        .then((res: any) => success(res.data.files.upload_file))
        .catch((err: unknown) => failure(err));
    };

    const editorRef = ref();
    const editorInit = reactive({
      width,
      height,
      language: 'zh-Hans',
      branding: false,
      images_upload_url: 'https://httpbin.org/post',
      images_upload_handler(
        blobInfo: Record<string, unknown>,
        success: (url: string) => void,
        failure: (err: unknown) => void
      ) {
        imgUpload(blobInfo, success, failure);
      },
      plugins: [
        'advlist',
        'autolink',
        'lists',
        'link',
        'image',
        'charmap',
        'preview',
        'anchor',
        'searchreplace',
        'visualblocks',
        'code',
        'fullscreen',
        'insertdatetime',
        'media',
        'table',
        'code',
        'wordcount',
        'image',
      ],
      toolbar:
        'undo redo | formatselect | bold italic backcolor | image insertfile alignleft aligncenter alignright alignjustify bullist numlist outdent indent removeformat help',
    });

    watch(content, () => {
      context.emit('cc', content.value);
    });

    return {
      content,
      editorRef,
      editorInit,
    };
  },
});
</script>
