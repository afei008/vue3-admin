<!-- @format -->

<template>
  <editor
    api-key="k4llym7ey74hcmxd7bftnmbacjzy0juzywoaml6i8a90rvy9"
    :init="editorInit"
    ref="editorRef"
    v-model="content"
  >
  </editor>
</template>

<script lang="ts">
import {
  defineComponent, reactive, ref, toRefs, watch,
} from 'vue';
import Editor from '@tinymce/tinymce-vue';
import useCurrentInstance from '@/composables/useCurrentInstance';

export default defineComponent({
  name: 'TinymceEditor',
  components: {
    Editor,
  },
  props: {
    msg: null,
    width: {
      type: [Number, String],
    },
    height: {
      type: [Number, String],
    },
  },
  model: {
    porp: 'msg',
    event: 'cc',
  },
  setup(props, context) {
    const { width, height } = toRefs(props);
    const content = ref();
    const { proxy } = useCurrentInstance();

    const imgUpload = (
      blobInfo: Record<string, unknown>,
      success: (url: string) => void,
      failure: (err: unknown) => void,
    ) => {
      proxy.$api
        .fileUpload({ blobInfo })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((res: any) => success(res.data.files.upload_file))
        .catch((err: unknown) => failure(err));
    };

    const editorRef = ref();
    const editorInit = reactive({
      width,
      height,
      language: 'zh_CN',
      branding: false,
      images_upload_url: 'https://httpbin.org/post',
      images_upload_handler(
        blobInfo: Record<string, unknown>,
        success: (url: string) => void,
        failure: (err: unknown) => void,
      ) {
        imgUpload(blobInfo, success, failure);
      },
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount',
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
