<!-- @format -->

<template>
  <div v-if="!item?.meta?.hidden">
    <template v-if="onlyChild">
      <app-link v-if="onlyChild.meta" :to="resolvePath(onlyChild.path)">
        <a-menu-item :key="resolvePath(onlyChild.path)">
          <title-item
            :title="onlyChild.meta.title"
            :icon="onlyChild.meta.icon || item.meta.icon"
          />
        </a-menu-item>
      </app-link>
    </template>
    <a-sub-menu v-else :key="resolvePath(item.path)">
      <template #title>
        <title-item :title="item.meta.title" :icon="item.meta.icon" />
      </template>
      <app-sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(item.path)"
        class="nest-menu"
      />
    </a-sub-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { resolve } from 'path-browserify';
import { isExternal } from '@/libs/validate';
import AppLink from './AppLink.vue';
import TitleItem from './TitleItem.vue';

export default defineComponent({
  name: 'AppSidebarItem',
  components: {
    AppLink,
    TitleItem,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    basePath: {
      type: String,
      default: '',
    },
    isNest: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    onlyChild() {
      if (!this.item.children) {
        return this.item;
      }
      let oneChild = {} as RouteRecordRaw;
      const showingChildren = this.item.children.filter(
        (item: RouteRecordRaw) => {
          if (!item?.meta?.hidden) {
            oneChild = item;
          }
          return !item?.meta?.hidden;
        }
      );

      if (showingChildren.length > 1) {
        return false;
      }
      let basePath = oneChild.path;
      if (this.basePath !== this.item.path) {
        basePath = `${this.basePath}/${this.item.path}/${oneChild?.path}`;
      }
      if (showingChildren.length === 1) {
        if (
          showingChildren[0].children &&
          showingChildren[0].children.length > 0
        ) {
          return false;
        }
        return { ...oneChild, path: basePath };
      }
      if (showingChildren.length === 0) {
        return { ...this.item, path: '' };
      }

      return oneChild;
    },
  },
  methods: {
    resolvePath(routePath: string) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return resolve(this.basePath, routePath);
    },
  },
});
</script>
