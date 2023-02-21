/** @format */

// 基础节点类型
export interface BaseNode {
  shape: string;
  x?: number;
  y?: number;
  data: Record<string, string | number>;
  prop?: (arg1?: string, arg2?: object | string | number) => any;
}

// graph 里面的 data 数据类型，用于渲染成 html 元素用
interface CustomData {
  x: number;
  y: number;
  fill: string;
  label: string;
  shape: string;
  bind: string; // 绑定接口字段
  img: string;
}

export type Data = CustomData & CSSStyleDeclaration;

export const data = {
  width: 100,
  height: 100,
  x: 0,
  y: 0,
  label: '',
  fill: 'transparent',
  shape: '',
  img: '',
  zIndex: 0,
  color: '#000000',
  fontSize: 14,
  alignItems: '',
  justifyContent: '',
};

const baseNode = (type?: string): BaseNode => {
  return {
    shape: `custom-vue-${type}`,
    x: 0,
    y: 0,
    data: {
      ...data,
      label: `${type || ''}`,
      fill: type === 'image' ? 'transparent' : '#e14e6f',
      shape: `${type}`,
    },
  };
};

export default baseNode;
