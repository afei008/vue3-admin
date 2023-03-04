<!-- @format -->

<template>
  <el-button type="primary" @click="translate">回到原点</el-button>
  <el-button type="primary" :disabled="!history.isUndo" @click="undo">
    撤销
  </el-button>
  <el-button type="primary" :disabled="!history.isRedo" @click="redo">
    重做
  </el-button>
  <el-button type="primary" @click="loadData">加载</el-button>
  <el-button type="primary" @click="clearData">清空</el-button>
  <el-button type="primary" @click="open">预览</el-button>
  <el-dialog v-model="show" destroy-on-close :closable="false" width="1100px">
    <template #footer>
      <el-button key="back" type="primary" @click="close">确认</el-button>
    </template>
    <div ref="viewRef" class="view-wrap" />
  </el-dialog>
</template>

<script lang="ts" setup name="ToolsComp">
import { ref, nextTick, toRefs } from 'vue';
import createElement from './createElement';
import graphEvent from '../../composables/graphEvent';

const data = [
  {
    id: '1',
    position: {
      x: 480,
      y: 130,
    },
    size: {
      width: 100,
      height: 100,
    },
    view: 'vue-shape-view',
    shape: 'custom-vue-circle',
    data: {
      width: 100,
      height: 100,
      x: 480,
      y: 130,
      label: 'circle',
      fill: '#9a7e9a',
      shape: 'circle',
      img: '',
    },
    zIndex: 1,
  },
];

const { history } = toRefs(graphEvent);

// tools
const loadData = () => {
  graphEvent.graph.fromJSON(data);
};
const clearData = () => {
  graphEvent.graph.fromJSON([]);
};
const translate = () => {
  graphEvent.graph.zoomTo(1);
  graphEvent.graph.positionPoint({ x: 0, y: 0 }, 0, 0);
};
const undo = () => {
  graphEvent.graph.undo();
};

const redo = () => {
  graphEvent.graph.redo();
};

// modal
const show = ref(false);
const viewRef = ref();
const open = () => {
  show.value = true;
  console.log(graphEvent.graph.toJSON());
  const shapeList = graphEvent.graph
    .toJSON()
    .cells.map((item: any) => item.data);
  nextTick(() => {
    const frag = createElement(shapeList);
    viewRef.value.appendChild(frag);
  });
};
const close = () => {
  show.value = false;
};
</script>

<style lang="scss" scoped>
.view-wrap {
  position: relative;
  width: 1000px;
  height: 60vh;
  margin: auto;
  overflow: hidden;
  border: 1px solid var(--primary-color);
}
</style>
