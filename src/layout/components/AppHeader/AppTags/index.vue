<!-- @format -->

<template>
  <div class="app-tags-container">
    <router-link
      v-for="item in (visitedViews as any)"
      :key="item.path"
      :to="{ path: item.path }"
      custom
    >
      <el-dropdown trigger="contextmenu" class="app-tags-item">
        <el-tag
          :class="isActive(item) ? 'tag-active' : ''"
          :effect="isActive(item) ? 'dark' : 'light'"
          closable
          @click="clickTag(item)"
          @close="closeTag(item)"
        >
          {{ item.title }}
        </el-tag>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item key="1" @click="refreshTag(item)">
              刷新
            </el-dropdown-item>
            <el-dropdown-item key="2" @click="closeTag(item)">
              关闭
            </el-dropdown-item>
            <el-dropdown-item key="3" @click="closeOthersTags(item)">
              关闭其他
            </el-dropdown-item>
            <el-dropdown-item key="4" @click="closeAllTags(item)">
              关闭所有
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
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

  & + .app-tags-item {
    margin-left: 10px;
  }
}
</style>
