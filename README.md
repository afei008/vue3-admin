<!-- @format -->

# vue3-admin

Vue 3.0 + Vue-Router 4.0 + Antd 3.0 + Echarts 5.0 + Axios 开发的后台管理系统

- [在线预览](https://afei008.github.io/vue3-admin)

使用了 Vue3.x 全家桶、状态管理使用了 pinia、ant-design-vue 3.x、typescript 4.x，考虑到大数据的情况，表格使用了 vxe-table

本项目的主要目的在于实现后台项目中常见功能，会根据实际情况加入某些特定业务的功能

目前主要实现了以下功能，更多功能正在开发中

- 动态路由：根据用户权限加载不同路由
- 动态表单：简化通用表单的调用
- 动态表格：与动态路由类似，可根据用户权限显示不同的表格字段，通过 Sortable.js 实现表格行列的拖动
- 指令权限：根据用户权限改变页面元素的显示
- Echarts 图表：Echarts 基本图表的使用
- 剪贴板组件：复制组件内的文本内容
- 富文本编辑器：采用 TinyMCE 实现

## 安装使用

- 获取项目代码

```bash
git clone git@github.com:afei008/vue3-admin.git
```

- 安装依赖

```bash
cd vue3-admin

npm install
```

- 运行

```bash
npm run dev
```

- 打包

```bash
npm run build
```
