/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { reactive, readonly } from 'vue';

export interface StateTypes {
  state: any;
  setColumns: (prop: Record<string, string>) => void;
  setSlots: (prop: string, slot: any) => void;
}

export default function useTable(data: Array<[]>): StateTypes {
  const state = reactive({
    columns: [] as Record<string, string>[],
    data,
    slots: {} as Record<string, any>,
  });

  const setColumns = (prop: Record<string, string>) => {
    state.columns.push(prop);
  };
  const setSlots = (prop: string, slot: any) => {
    state.slots[prop] = slot;
  };

  return {
    state: readonly(state),
    setColumns,
    setSlots,
  };
}
