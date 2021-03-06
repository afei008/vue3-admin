/** @format */

// 封装 getCurrentInstance
import { getCurrentInstance, ComponentInternalInstance } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useCurrentInstance(): Record<string, any> {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const proxy = appContext.config.globalProperties;
  return {
    proxy,
  };
}

// 用法

// import useCurrentInstance from '@/composables/useCurrentInstance'

// setup(){
//   const { proxy } = useCurrentInstance()
//   proxy.$api
//     .login()
//     .then((res: any) => console.log(res))
//     .catch((err: any) => console.log(err));
// }
