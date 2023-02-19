/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { reactive, ref, type Ref } from 'vue';
import microApp from '@micro-zoe/micro-app';

interface MicroAppTypes {
  dataToChild: Ref;
  sendDataToChild: () => void;
  handleDataChange: (e: any) => void;
}

const state = reactive({
  routeName: '',
});
const changeState = (routeName: string): void => {
  state.routeName = routeName;
};

export { state, changeState };

export default function useMicroApp(childRouteName: string): MicroAppTypes {
  const routeName = ref('');
  if (childRouteName) {
    routeName.value = childRouteName;
  }

  const dataToChild = ref({
    state: '基座发送给子应用的数据',
    routeName: sessionStorage.getItem('routeName') || '',
  });

  const sendDataToChild = () => {
    microApp.setData('vue-app', {
      state: '基座通过调用方法发送的数据',
      routeName: routeName.value,
    });
  };

  const handleDataChange = (e: any) => {
    if (e.detail.data.routeName) {
      routeName.value = e.detail.data.routeName;
    }
  };

  return {
    dataToChild,
    sendDataToChild,
    handleDataChange,
  };
}
