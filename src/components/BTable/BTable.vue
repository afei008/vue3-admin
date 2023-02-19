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
            <slot v-else :name="column.slots" :row-data="item" />
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { ColumnsTypes } from './interface';

export default defineComponent({
  props: {
    data: {
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
