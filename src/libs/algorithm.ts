/** @format */

// 常见算法

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @description: array 转 tree
 * @param {Array} array 要转换的数组
 * @param {string} parentKey 父级 key 字段
 * @param {number} pid 父级 key 字段初始值，通常不用填
 * @return {*} 转换好的 tree
 */
export function array2Tree<T extends Record<string, any>>(
  array: Array<T>,
  parentKey = 'pid',
  pid = 0
): Array<T> {
  return array
    .filter((item) => item[parentKey] === pid)
    .map((item) => ({
      ...item,
      children: array2Tree(array, parentKey, item.id),
    }));
}

/**
 * @description: tree 转 array
 * @param {Array} tree 要转换的树
 * @param {string} childKey 子级 key 字段
 * @param {Array} newArr 结果数组，通常不用填
 * @return {*} 转换好的 array
 */
export function tree2Array<T extends Record<string, any>>(
  tree: Array<T>,
  childKey = 'children',
  newArr: Array<any> = []
): Array<T> {
  tree.map((item) => {
    const children = item[childKey];
    const other = { ...item };
    delete other[childKey];
    if (children && children.length) {
      newArr.push(other);
      return tree2Array(children, childKey, newArr);
    }
    newArr.push(other);
    return '';
  });
  return newArr;
}
/**
 * @description: 比较函数，调用 sort 方法排序时使用
 * @param {string} key 用于比较的键名
 * @return {*}
 */
export function compareProps(key: string) {
  return (obj1: Record<string, any>, obj2: Record<string, any>): number => {
    if (obj1[key] === obj2[key]) {
      return 0;
    }
    return obj1[key] > obj2[key] ? 1 : -1;
  };
}
