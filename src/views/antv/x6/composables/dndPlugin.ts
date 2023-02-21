/** @format */

import { nextTick, reactive } from 'vue';
import type { Graph, Node } from '@antv/x6';
import { Dnd } from '@antv/x6-plugin-dnd';
import { activeShape } from './activeShape';
import baseNode from '../config';

const dndState = reactive({
  graph: null as any,
  dnd: null as any,
  init(graph: Graph) {
    this.graph = graph;
    this.dnd = new Dnd({
      target: graph,
      getDropNode: (node: Node) => {
        const clone = node.clone();
        nextTick(() => {
          activeShape.setShape(clone);
        });
        return clone;
      },
    });
  },
  drapShape(e: MouseEvent, shape: string) {
    const node = this.graph.createNode(baseNode(shape));
    this.dnd.start(node, e);
  },
});

export default dndState;
