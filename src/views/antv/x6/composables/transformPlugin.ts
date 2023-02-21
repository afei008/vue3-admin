/** @format */

import { reactive } from 'vue';
import type { Graph } from '@antv/x6';
import { Transform } from '@antv/x6-plugin-transform';

const resizingOptions = {
  enabled: true,
  minWidth: 10,
  minHeight: 10,
};

const state = reactive({
  init(graph: Graph) {
    graph.use(
      new Transform({
        resizing: resizingOptions,
      })
    );
  },
});

export default state;
