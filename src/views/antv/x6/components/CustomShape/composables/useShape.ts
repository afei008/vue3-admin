/** @format */

import { inject, onMounted, ref } from 'vue';
import { data } from '../../../config';

function useShape() {
  const getNode = inject('getNode') as any;
  const nodeStyle = ref({
    ...data,
  });

  const setNode = (node: any) => {
    nodeStyle.value = { ...node };
  };

  onMounted(() => {
    const node = getNode();
    setNode(node.data);
    node.on('change:data', ({ current }: { current: any }) => {
      setNode(current);
    });
  });

  return {
    nodeStyle,
  };
}

export default useShape;
