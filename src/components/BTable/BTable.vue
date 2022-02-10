<!-- @format -->

<template>
  <table border="1">
    <thead>
      <th v-for="(item, index) in columns" :key="index">{{ item.label }}</th>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <td v-for="(column, colIndex) in columns" :key="colIndex">
          <span>
            <slot v-if="!column.slots">{{ item[column.prop] }}</slot>
            <slot v-else :name="column.slots" :rowData="item"></slot>
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ColumnsTypes } from './interface'

export default defineComponent({
  props: {
    data: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: Array as PropType<any[]>,
      default: () => [],
    },
    columns: {
      type: Array as PropType<ColumnsTypes[]>,
      default: () => [],
    },
  },
});
</script>
