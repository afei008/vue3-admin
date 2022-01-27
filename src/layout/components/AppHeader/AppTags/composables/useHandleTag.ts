/** @format */

import { nextTick, onMounted, watch } from 'vue';
import { useRoute, useRouter, RouteLocation } from 'vue-router';
import { useStore } from '@/store';

interface HandleTagTypes {
  clickTag: (tag: RouteLocation) => void;
  refreshTag: (tag: RouteLocation) => void;
  closeTag: (tag: RouteLocation) => void;
  closeOthersTags: (tag: RouteLocation) => void;
  closeAllTags: (tag: RouteLocation) => void;
  isActive: (tag: RouteLocation) => boolean;
}

export default function useHandleTag(): HandleTagTypes {
  const store = useStore();
  const route = useRoute();
  const router = useRouter();

  const addTag = () => {
    const { name } = route;
    if (name) {
      store.dispatch('appTagsState/addView', route);
    }
  };

  const isActive = (tag: RouteLocation): boolean => tag.path === route.path;

  const toLastTags = (
    visitedViews: RouteLocation[],
    view: RouteLocation,
  ): void => {
    const latestView = visitedViews.slice(-1)[0];
    if (latestView) {
      router.push(latestView.fullPath);
    } else if (view.name === 'Workplace') {
      router.replace({ path: `/redirect${view.fullPath}` });
    } else {
      router.push('/');
    }
  };

  const clickTag = (tag: RouteLocation) => {
    router.push(tag.path);
  };
  const refreshTag = (tag: RouteLocation) => {
    store.dispatch('appTagsState/delCachedView', tag).then(() => {
      const { fullPath } = tag;
      nextTick(() => {
        router.replace({ path: `/redirect${fullPath}` });
      });
    });
  };
  const closeTag = (tag: RouteLocation) => {
    store.dispatch('appTagsState/delView', tag).then(({ visitedViews }) => {
      if (isActive(tag)) {
        toLastTags(visitedViews, tag);
      }
    });
  };
  const closeOthersTags = (tag: RouteLocation) => {
    router.push(tag.path);
    store.dispatch('appTagsState/delOthersViews', tag);
  };
  const closeAllTags = (tag: RouteLocation) => {
    store.dispatch('appTagsState/delAllViews').then(({ visitedViews }) => {
      toLastTags(visitedViews, tag);
    });
  };

  watch(route, () => {
    addTag();
  });

  onMounted(() => {
    addTag();
  });

  return {
    isActive,
    clickTag,
    refreshTag,
    closeTag,
    closeOthersTags,
    closeAllTags,
  };
}
