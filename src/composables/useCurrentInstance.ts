/** @format */

// 封装 getCurrentInstance
import { getCurrentInstance, ComponentInternalInstance } from 'vue';

export default function useCurrentInstance(): Record<string, any> {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const proxy = appContext.config.globalProperties;
  return {
    proxy,
  };
}

// 用法

// import useCurrentInstance from '@/libs/useCurrentInstance'

// setup(){
//   const { proxy } = useCurrentInstance()
//   proxy.$api
//     .login()
//     .then((res: any) => console.log(res))
//     .catch((err: any) => console.log(err));
// }
