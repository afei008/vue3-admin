/** @format */

import { reactive } from 'vue';
import type { Graph, Node } from '@antv/x6';
import { activeShape } from './activeShape';

const state = reactive({
  graph: '' as any,
  history: {
    isUndo: false,
    isRedo: false,
  },
  init(graph: Graph) {
    this.graph = graph;
    graph.on('node:click', ({ node }: { node: Node }) => {
      activeShape.setShape(node);
    });
    graph.on('node:mousemove', ({ node }: { node: Node }) => {
      activeShape.setShape(node);
    });
    graph.on('node:resizing', ({ node }: { node: Node }) => {
      activeShape.setShape(node);
    });
    graph.on('history:change', () => {
      this.history.isUndo = graph.canUndo();
      this.history.isRedo = graph.canRedo();
    });
    // 鼠标 Hover 时添加删除按钮
    graph.on('node:mouseenter', ({ node }) => {
      node.addTools({
        name: 'button-remove',
        args: {
          x: 0,
          y: 0,
          offset: { x: 10, y: 10 },
        },
      });
    });
    // 鼠标移开时删除删除按钮
    graph.on('node:mouseleave', ({ node }) => {
      node.removeTools();
    });
  },
});

export default state;
