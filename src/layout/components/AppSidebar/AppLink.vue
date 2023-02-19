<!-- @format -->

<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { isExternal } from '@/libs/validate';

export default defineComponent({
  name: 'AppLink',
  props: {
    to: {
      type: String,
      default: '',
      required: true,
    },
  },
  computed: {
    isExternal() {
      return isExternal(this.to);
    },
    type() {
      if (this.isExternal) {
        return 'a';
      }
      return 'router-link';
    },
  },
  methods: {
    linkProps(to: string) {
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener',
        };
      }
      return {
        to,
      };
    },
  },
});
</script>
