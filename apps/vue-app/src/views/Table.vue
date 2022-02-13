<!-- @format -->

<template>
  <div>
    <tui-editor :initialValue="initialValue"></tui-editor>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TuiEditor from '@/components/TuiEditor/index.vue';

export default defineComponent({
  components: { TuiEditor },
  setup() {
    const initialValue = ref('');
    initialValue.value = `
    \n # 学习如何手动实现一个 table 组件
    \n antd 的传参方式相对简单，因为表头是同个一个属性传入的，并且 slot 都是同一级

    \n 下面主要记录一下 element-ui 的实现方式
    \n element-ui 的难点在于表头的获取和 slot 的展示，需要用到渲染函数。table-column 本身并不参与展示，只是用于收集表头和 slot，然后在 table-head 和 table-body 处渲染

    \n 1. useTable 里面定义了一个 data 属性，和 setColumns、setSlots 两个方法

    \n 1. 组件入口通过 provide 提供属性，用于子组件调用
    \`\`\`js
    \\\\ ETable.vue
    setup(props) {
      // 提供组件属性，以供子组件调用
      provide('table', useTable(props.data));
    },
    \`\`\`

    \n 1. 在 table-column 里面用 inject 注入前面提供的属性，通过 setColumns 方法获取表头，因为 table-column 是按顺序加载的，所以此处也会按顺序获取到的 label 和 props。同时收集插槽，如果有，就通过 setSlots 方法将其储存起来
    \`\`\`js
    \\\\ ETableColumn.vue
    setup(props, context) {
      // 此组件主要用来获取 columns 和 slots，自身并不展示
      const { setColumns, setSlots } = inject('table') as StateTypes;
      setColumns({ label: props.label, prop: props.prop });
      const { slots } = context;
      if (slots && slots.default) {
        setSlots(\`\${props.prop}\`, slots.default);
      }
    },
    render() {
      return null;
    },
    \`\`\`

    \n 1. 剩下的就是在 table-head 和 table-body 里面遍历前面存储的数据了
    table-body 通过渲染函数生成，因为要使用插槽，暂时没想到好方法通过 template 使用前面收集到的插槽
    \`\`\`js
    \\\\ ETableBody.vue
    setup() {
      // 此处需要用到渲染函数，主要是为了渲染收集到的 slots
      // 此处因为层级不多，所以直接使用 h 函数循环生成，如有需要可选择 jxs 写法
      const { state } = inject('table') as StateTypes;

      if (state.data.length) {
        return () => h(
          'tbody',
          state.data.map((tr: any) => h(
            'tr',
            state.columns.map((td: any) => {
              if (!state.slots[td.prop]) {
                return h('td', tr[td.prop]);
              }
              return h(
                'td',
                { rowData: tr },
                state.slots[td.prop]({ rowData: tr }),
              );
            }),
          )),
        );
      }
      return () => h('p', 'no found');
    },
    \`\`\`
    `;

    return { initialValue };
  },
});
</script>
