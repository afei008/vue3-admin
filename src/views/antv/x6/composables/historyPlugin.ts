/** @format */

import { reactive } from 'vue';
import type { Graph } from '@antv/x6';
import { History } from '@antv/x6-plugin-history';

const state = reactive({
  init(graph: Graph) {
    graph.use(
      new History({
        enabled: true,
        beforeAddCommand: (e, args: any) => {
          if (args.key === 'tools') {
            return false;
          }
          return true;
        },
      })
    );
  },
});

export default state;
