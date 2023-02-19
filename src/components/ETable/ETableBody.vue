<!-- @format -->

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { h, defineComponent, inject } from 'vue';
import type { StateTypes } from './composables/useTable';

export default defineComponent({
  setup() {
    // 此处需要用到渲染函数，主要是为了渲染收集到的 slots
    // 此处因为层级不多，所以直接使用 h 函数循环生成，如有需要可选择 jxs 写法
    const { state } = inject('table') as StateTypes;

    if (state.data.length) {
      return () =>
        h(
          'tbody',
          state.data.map((tr: any) =>
            h(
              'tr',
              state.columns.map((td: any) => {
                if (!state.slots[td.prop]) {
                  return h('td', tr[td.prop]);
                }
                return h(
                  'td',
                  { rowData: tr },
                  state.slots[td.prop]({ rowData: tr })
                );
              })
            )
          )
        );
    }
    return () => h('p', 'no found');
  },
});
</script>
