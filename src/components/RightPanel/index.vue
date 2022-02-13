<!-- @format -->

<template>
  <div class="right-panel" :class="isShow ? 'show-panel' : ''">
    <left-circle-filled
      class="btn"
      style="font-size: 32px"
      @click="showPanel"
    ></left-circle-filled>
    <div class="micro-app">
      <micro-app
        name="vue-app"
        :url="microAppUrl"
        :baseroute="currPath"
        :data="dataToChild"
        @datachange="handleDataChange"
        @mounted="microAppMounted"
      ></micro-app>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onDeactivated,
  onMounted,
  onUnmounted,
  ref,
} from 'vue';
import { useRoute } from 'vue-router';
import useScrollbars from '@/composables/useScrollbars';
import { LeftCircleFilled } from '@ant-design/icons-vue';
import useMicroApp from './composables/useMicroApp';

export default defineComponent({
  name: 'RightPanel',
  components: { LeftCircleFilled },
  props: {
    childRouteName: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const route = useRoute();

    const isShow = ref(false);
    const { initScrollbars } = useScrollbars({ el: '.micro-app' });
    const { dataToChild, sendDataToChild, handleDataChange } = useMicroApp(
      props.childRouteName,
    );

    const showPanel = () => {
      isShow.value = !isShow.value;
      sendDataToChild();
    };

    const microAppMounted = () => {
      console.log('已经子应用渲染完成');
      sendDataToChild();
    };

    onMounted(() => {
      initScrollbars.value();
    });

    onUnmounted(() => {
      isShow.value = false;
    });
    onDeactivated(() => {
      isShow.value = false;
    });

    const microAppUrl = process.env.VUE_APP_MICRO_APP_URL;

    return {
      currPath: route.path,
      isShow,
      showPanel,
      dataToChild,
      handleDataChange,
      sendDataToChild,
      microAppMounted,
      microAppUrl,
    };
  },
});
</script>

<style lang="scss" scoped>
.right-panel {
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: calc(100vh - 94px - 40px);
  padding-left: 52px;
  background: rgba($color: #fff, $alpha: 0.8);
  backdrop-filter: blur(2px);
  transform: translateX(calc(100% - 32px));
  transition: 0.5s;
  .btn {
    position: absolute;
    inset: 0;
    margin: auto 0;
    width: 32px;
    height: 32px;
    background: #fff;
    color: var(--primary-color);
    border-radius: 50%;
    z-index: 1;
  }
  .micro-app {
    height: 100%;
    box-shadow: 0 0 10px 1px rgba($color: #000000, $alpha: 0.2);
  }
  &.show-panel {
    transform: translateX(0);
    padding-left: 0;
    .btn {
      margin-left: 10px;
      transform: rotate(180deg);
    }
  }
}
</style>
