<!-- @format -->

<template>
  <div class="antv-x6">
    <div class="head flex je">
      <tools-comp />
    </div>
    <div class="body flex">
      <div class="left shadow bg-white">
        <dnd-comp />
      </div>
      <div id="x6" class="shadow" />
    </div>
    <teleport-container />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useAntvX6 from './composables/useAntvX6';
import TeleportContainer from './components/CustomShape';
import DndComp from './components/DndComp/index.vue';
import ToolsComp from './components/ToolsComp/index.vue';

export default defineComponent({
  name: 'AntvX6',
  components: {
    TeleportContainer,
    DndComp,
    ToolsComp,
  },
  setup() {
    const { graph } = useAntvX6({
      container: 'x6',
      autoResize: true,
      grid: {
        size: 10,
        type: 'doubleMesh',
        visible: true,
        args: [
          {
            color: '#eee', // 主网格线颜色
            thickness: 1, // 主网格线宽度
          },
          {
            color: '#ddd', // 次网格线颜色
            thickness: 1, // 次网格线宽度
            factor: 4, // 主次网格线间隔
          },
        ],
      },
      panning: true,
      mousewheel: true,
      background: {
        color: '#F2F7FA',
      },
    });

    return {
      graph,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './style';
</style>
