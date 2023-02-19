/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { onMounted, reactive, watch, toRefs, type Ref } from 'vue';
import useCurrentInstance from '@/composables/useCurrentInstance';

interface DutyTypes {
  isLoading: Ref<boolean>;
  dutyList: Record<string, any>;
  pages: Ref<any>;
  getDutyList: () => void;
}

export default function useDuty(params: Record<string, any>): DutyTypes {
  const { proxy } = useCurrentInstance();

  const state = reactive({
    isLoading: false,
    dutyList: [],
    pages: {
      pageNum: 1,
      pageSize: 10,
      total: 0,
    },
  });

  const getDutyList = async () => {
    state.isLoading = true;
    const res = await proxy.$api.dutyList(params.value);
    state.dutyList = res.data.records;
    state.pages.total = res.data.total;
    state.isLoading = false;
  };

  watch(
    params,
    () => {
      state.pages.pageNum = params.value.pageNum;
      state.pages.pageSize = params.value.pageSize;
      getDutyList();
    },
    { deep: true }
  );

  onMounted(getDutyList);

  return {
    ...toRefs(state),
    getDutyList,
  };
}
