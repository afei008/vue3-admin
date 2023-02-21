/** @format */

import { reactive } from 'vue';
import type { Node } from '@antv/x6';
import baseNode from '../config';

const shape = baseNode();
const activeShape = reactive({
  node: baseNode(),
  prop: { ...shape.data },
  setShape(node: Node): void {
    activeShape.node = node;
    const prop = node.prop();
    activeShape.prop = {
      ...prop.data,
      ...prop.position,
      ...prop.size,
      zIndex: prop.zIndex,
    };
    node.setData(activeShape.prop);
  },
});

export { activeShape };
