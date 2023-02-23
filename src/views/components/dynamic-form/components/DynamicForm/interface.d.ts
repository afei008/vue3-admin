/** @format */

// type：表单项类型
// label：表单项标题
// name：提交的字段名
// value：默认值
// options：select、checkbox、radio 的 option 对象
// attrs：组件的属性
// rank：排序
export default interface DynamicTypes {
  type: string;
  label?: string;
  name: string;
  value?: any;
  options?: Record<string, any> | null;
  attrs?: Record<string, any>;
  rank?: number;
  rule?: Array<any>;
  build?: boolean;
}
