/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  onMounted, onUnmounted, ref, watch,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default function useMicroApp(): void {
  const route = useRoute();
  const router = useRouter();

  const dataFromMain = ref({});
  dataFromMain.value = window.microApp ? window.microApp.getData() : {};

  const dataListener = (data: Record<string, any>) => {
    dataFromMain.value = data;

    if (data.routeName) {
      router.push({ name: data.routeName });
    }
  };

  const sendRouteName = (name: any) => {
    if (window.microApp) {
      window.microApp.dispatch({ routeName: name });
    }
  };

  onMounted(() => {
    if (window.microApp) {
      window.microApp.addDataListener(dataListener);
    }
  });

  watch(route, (nv) => {
    sendRouteName(nv.name);
  });

  watch(
    dataFromMain,
    (nv) => {
      const { routeName } = nv as { routeName: string };
      if (routeName) {
        router.push({ name: routeName });
      }
    },
    { deep: true, immediate: true },
  );

  onUnmounted(() => {
    if (window.microApp) {
      window.microApp.clearDataListener();
    }
  });
}
