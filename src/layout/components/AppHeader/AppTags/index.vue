<!-- @format -->

<template>
  <div class="app-tags-container">
    <router-link
      v-for="item in (visitedViews as any)"
      :key="item.path"
      :to="{ path: item.path }"
      custom
    >
      <a-dropdown :trigger="['contextmenu']">
        <a-tag
          class="app-tags-item"
          :class="isActive(item) ? 'tag-active' : ''"
          closable
          @click="clickTag(item)"
          @close="closeTag(item)"
        >
          {{ item.title }}
        </a-tag>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1" @click="refreshTag(item)">刷新</a-menu-item>
            <a-menu-item key="2" @click="closeTag(item)">关闭</a-menu-item>
            <a-menu-item key="3" @click="closeOthersTags(item)">
              关闭其他
            </a-menu-item>
            <a-menu-item key="4" @click="closeAllTags(item)">
              关闭所有
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useAppTagsStore } from '@/store/modules/appTags';
import useHandleTag from './composables/useHandleTag';
import useScroll from './composables/useScroll';

export default defineComponent({
  name: 'AppTags',
  setup() {
    const appTagsStore = useAppTagsStore();

    const {
      isActive,
      clickTag,
      refreshTag,
      closeTag,
      closeOthersTags,
      closeAllTags,
    } = useHandleTag();

    useScroll();

    return {
      visitedViews: computed(() => appTagsStore.visitedViews) as any,
      isActive,
      clickTag,
      refreshTag,
      closeTag,
      closeOthersTags,
      closeAllTags,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-tags-container {
  height: 30px;
  white-space: nowrap;
}

:deep(.app-tags-item) {
  cursor: pointer;

  &.tag-active {
    color: #fff;
    background: var(--secondary-color);
    border-color: var(--secondary-color);

    .anticon {
      color: #fff;
    }
  }

  .anticon {
    padding: 2px;
    border-radius: 50%;

    &:hover {
      background: #d9d9d9;
    }
  }
}
</style>
