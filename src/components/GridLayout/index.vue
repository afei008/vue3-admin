<!-- @format -->

<template>
  <div class="grid-layout-group">
    <div class="left">
      <draggable
        item-key="id"
        :list="leftModel"
        :group="{ name: 'model', pull: 'clone', put: false }"
        :sort="false"
      >
        <template #item="{ element }">
          <div class="left-item">{{ element.name }}</div>
        </template>
      </draggable>
      <p>简单演示拖拽生成布局，右侧为设计页面，下方为实际展示效果</p>
    </div>
    <div ref="rightRef" :key="key" class="right">
      <div style="height: 100%">
        <draggable
          tag="transition-group"
          item-key="id"
          :list="rightModel"
          group="model"
        >
          <template #item="{ element }">
            <div style="position: absolute; display: none">
              {{ element.name }}
            </div>
          </template>
        </draggable>
      </div>

      <vue3-draggable-resizable
        v-for="item in rightModel"
        :key="item.id"
        v-model:x="item.x"
        v-model:y="item.y"
        v-model:w="item.w"
        v-model:h="item.h"
        v-model:active="item.active"
        :init-w="item.w"
        :init-h="item.h"
        :draggable="true"
        :resizable="true"
        :parent="true"
        @activated="print('activated')"
        @deactivated="print('deactivated')"
        @drag-start="print('drag-start')"
        @resize-start="print('resize-start')"
        @dragging="print('dragging')"
        @resizing="print('resizing')"
        @drag-end="print('drag-end')"
        @resize-end="print('resize-end')"
      >
        <div
          class="right-item"
          :style="{ width: item.w + 'px', height: item.h + 'px' }"
        >
          {{ item.name }}
        </div>
      </vue3-draggable-resizable>
    </div>
  </div>
  <div class="result">
    <div
      v-for="item in rightModel"
      :key="item.id"
      class="result-item"
      :style="{
        width: (item.w / rightWidth) * 100 + '%',
        height: (item.h / rightHeight) * 100 + '%',
        left: (item.x / rightWidth) * 100 + '%',
        top: (item.y / rightHeight) * 100 + '%',
      }"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from 'vue';
import draggable from 'vuedraggable';
// 这个拖拽组件拖拽点有bug
import Vue3DraggableResizable from 'vue3-draggable-resizable';
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css';
import collapsed from '@/layout/components/AppSidebar/composables/useCollapsed';

export default defineComponent({
  name: 'GridLayout',
  components: { draggable, Vue3DraggableResizable },
  setup() {
    const leftModel = reactive([
      {
        id: 1,
        name: '模块1',
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        active: false,
      },
      {
        id: 2,
        name: '模块2',
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        active: false,
      },
      {
        id: 3,
        name: '模块3',
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        active: false,
      },
    ]);
    const rightModel = reactive(
      [] as Array<{
        id: number;
        name: string;
        x: number;
        y: number;
        w: number;
        h: number;
        active: boolean;
      }>
    );
    const rightRef = ref();
    const rightWidth = ref(0);
    const rightHeight = ref(0);

    const key = ref(0);

    const getRightStyle = () => {
      setTimeout(() => {
        const styles = window.getComputedStyle(rightRef.value);
        rightWidth.value = parseInt(styles.width, 10);
        rightHeight.value = parseInt(styles.height, 10);
        key.value += 1;
      }, 300);
    };

    onMounted(() => {
      getRightStyle();
      window.addEventListener('resize', getRightStyle);
    });

    onUnmounted(() => {
      // 应该在离开路由时移除监听，此处仅为示例使用
      window.removeEventListener('resize', getRightStyle);
    });

    watch(collapsed, () => {
      getRightStyle();
    });

    return {
      leftModel,
      rightModel,
      rightRef,
      rightWidth,
      rightHeight,
      key,
    };
  },
  data() {
    return {
      x: 100,
      y: 100,
      h: 100,
      w: 100,
      active: false,
    };
  },
  methods: {
    print(val: string) {
      console.log(val);
    },
  },
});
</script>
<style lang="scss" scoped>
@import './style';
</style>
