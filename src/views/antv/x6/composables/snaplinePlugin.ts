/** @format */

import { reactive } from 'vue';
import type { Graph } from '@antv/x6';
import { Snapline } from '@antv/x6-plugin-snapline';

const state = reactive({
  init(graph: Graph) {
    graph.use(
      new Snapline({
        enabled: true,
      })
    );
  },
});

export default state;
