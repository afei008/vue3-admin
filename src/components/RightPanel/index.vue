<!-- @format -->

<template>
  <div class="right-panel" :class="isShow ? 'show-panel' : ''">
    <left-circle-filled
      class="btn bg-white"
      style="font-size: 32px"
      @click="showPanel"
    />
    <overlay-scrollbars-component defer>
      <div class="micro-app">
        <micro-app
          name="vue-app"
          :url="microAppUrl"
          :baseroute="currPath"
          :data="dataToChild"
          @datachange="handleDataChange"
          @mounted="microAppMounted"
        />
      </div>
    </overlay-scrollbars-component>
  </div>
</template>

<script lang="ts">
import { defineComponent, onDeactivated, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { LeftCircleFilled } from '@ant-design/icons-vue';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import useMicroApp from './composables/useMicroApp';

export default defineComponent({
  name: 'RightPanel',
  components: { LeftCircleFilled, OverlayScrollbarsComponent },
  props: {
    childRouteName: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const route = useRoute();

    const isShow = ref(false);
    const { dataToChild, sendDataToChild, handleDataChange } = useMicroApp(
      props.childRouteName
    );

    const showPanel = () => {
      isShow.value = !isShow.value;
      sendDataToChild();
    };

    const microAppMounted = () => {
      console.log('已经子应用渲染完成');
      sendDataToChild();
    };

    onUnmounted(() => {
      isShow.value = false;
    });
    onDeactivated(() => {
      isShow.value = false;
    });

    const microAppUrl = `${import.meta.env.VITE_VUE_APP_MICRO_APP_URL}`;

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
  --h: calc(100vh - 94px);

  position: fixed;
  top: 94px;
  right: 0;
  width: 50%;
  height: var(--h);
  padding-left: 52px;
  background: rgba($color: #fff, $alpha: 0.8);
  transition: 0.5s;
  transform: translateX(calc(100% - 32px));
  backdrop-filter: blur(2px);

  .btn {
    position: absolute;
    inset: 0;
    z-index: 1;
    width: 32px;
    height: 32px;
    margin: auto 0;
    color: var(--primary-color);
    border-radius: 50%;
  }

  .micro-app {
    height: var(--h);
    box-shadow: 0 0 10px 1px rgba($color: #000, $alpha: 0.2);
  }

  &.show-panel {
    padding-left: 0;
    transform: translateX(0);

    .btn {
      margin-left: 10px;
      transform: rotate(180deg);
    }
  }
}
</style>
