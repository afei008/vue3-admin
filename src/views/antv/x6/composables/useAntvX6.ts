/** @format */

import { onMounted, ref, type Ref } from 'vue';
import { Graph } from '@antv/x6';
import dndState from './dndPlugin';
import transformState from './transformPlugin';
import historyState from './historyPlugin';
import snaplineState from './snaplinePlugin';
import graphEvent from './graphEvent';

export default function useAntvX6(options: any) {
  const graph = ref({} as unknown as Ref<Graph>);

  const initGraph = () => {
    graph.value = new Graph({
      ...options,
      container: document.getElementById(options.container) as HTMLElement,
    });

    transformState.init(graph.value);
    historyState.init(graph.value);
    snaplineState.init(graph.value);
    dndState.init(graph.value);

    graphEvent.init(graph.value);
  };

  onMounted(() => {
    initGraph();
  });

  return {
    graph,
  };
}
