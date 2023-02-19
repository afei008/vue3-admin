/** @format */

import { nextTick, onMounted, watch } from 'vue';
import { useRoute, useRouter, type RouteLocation } from 'vue-router';
import { useAppTagsStore, type State } from '@/store/modules/appTags';
import useMenuKeys from '@/layout/components/AppSidebar/composables/useMenuKeys';

interface HandleTagTypes {
  clickTag: (tag: RouteLocation) => void;
  refreshTag: (tag: RouteLocation) => void;
  closeTag: (tag: RouteLocation) => void;
  closeOthersTags: (tag: RouteLocation) => void;
  closeAllTags: (tag: RouteLocation) => void;
  isActive: (tag: RouteLocation) => boolean;
}

export default function useHandleTag(): HandleTagTypes {
  const appTagsStore = useAppTagsStore();
  const route = useRoute();
  const router = useRouter();

  const addTag = () => {
    const { name } = route;
    if (name) {
      appTagsStore.addView(route);
    }
  };

  const isActive = (tag: RouteLocation): boolean => tag.path === route.path;

  const toLastTags = (
    visitedViews: RouteLocation[],
    view: RouteLocation
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

  const { getOpenKeys } = useMenuKeys();

  const clickTag = (tag: RouteLocation) => {
    router.push(tag.path);
    getOpenKeys();
  };
  const refreshTag = (tag: RouteLocation) => {
    appTagsStore.delCachedView(tag).then(() => {
      const { fullPath } = tag;
      nextTick(() => {
        router.replace({ path: `/redirect${fullPath}` });
      });
    });
  };
  const closeTag = (tag: RouteLocation) => {
    appTagsStore.delView(tag).then((res) => {
      const { visitedViews } = res as State;
      if (isActive(tag)) {
        toLastTags(visitedViews, tag);
      }
    });
  };
  const closeOthersTags = (tag: RouteLocation) => {
    router.push(tag.path);
    appTagsStore.delOthersViews(tag);
  };
  const closeAllTags = (tag: RouteLocation) => {
    appTagsStore.delAllViews().then((res) => {
      const { visitedViews } = res as State;
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
