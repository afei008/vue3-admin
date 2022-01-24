<!-- @format -->

<template>
  <div v-if="!item?.meta?.hidden">
    <template v-if="onlyChild">
      <app-link v-if="onlyChild.meta" :to="resolvePath(onlyChild.path)">
        <a-menu-item :key="resolvePath(onlyChild.path)">
          <title-item
            :title="onlyChild.meta.title"
            :icon="onlyChild.meta.icon || item.meta.icon"
          ></title-item>
        </a-menu-item>
      </app-link>
    </template>
    <a-sub-menu v-else :key="resolvePath(item.path)">
      <template #title>
        <title-item
          :title="item.meta.title"
          :icon="item.meta.icon"
        ></title-item>
      </template>
      <app-sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(item.path)"
        class="nest-menu"
      ></app-sidebar-item>
    </a-sub-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import MetaTypes from '@/router/interface';
import { isExternal } from '@/libs/validate';
import AppLink from './AppLink.vue';
import TitleItem from './TitleItem.vue';

const path = require('path');

interface ChildTypes {
  meta?: MetaTypes;
  path?: string;
}

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
      let oneChild = {} as Record<string, any>;
      const showingChildren = this.item.children.filter((item: ChildTypes) => {
        if (!item?.meta?.hidden) {
          oneChild = item;
        }
        return !item?.meta?.hidden;
      });

      if (showingChildren.length > 1) {
        return false;
      }
      let basePath = oneChild.path;
      if (this.basePath !== this.item.path) {
        basePath = `${this.basePath}/${this.item.path}/${oneChild?.path}`;
      }
      if (showingChildren.length === 1) {
        return { ...oneChild, path: basePath };
      }
      if (showingChildren.lenght === 0) {
        return { ...this.item, path: '' };
      }

      return oneChild;
    },
  },
  methods: {
    resolvePath(routePath: any) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
});
</script>
