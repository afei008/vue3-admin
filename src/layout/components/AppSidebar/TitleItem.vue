<!-- @format -->

<script lang="ts">
import { defineComponent, h, toRefs } from 'vue';
import IconFont from '@/components/IconFont/index.vue';
import collapsed from './composables/useCollapsed';

export default defineComponent({
  name: 'TitleItem',
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {
      ...toRefs(collapsed),
    };
  },
  render() {
    const vnodes = [];
    if (this.icon) {
      vnodes.push(
        h(IconFont, {
          type: this.icon,
          class: 'menu-icon',
        })
      );
    }
    if (this.title) {
      vnodes.push(h('span', { class: 'menu-text' }, this.title));
    }
    return h(
      'span',
      { class: `menu-title ${this.collapsed ? 'center' : ''}` },
      vnodes
    );
  },
});
</script>
<style lang="scss" scoped>
.menu-title {
  display: flex;
  align-items: center;
  &.center {
    justify-content: center;
  }
  .menu-icon {
    margin-right: 15px;
  }
}
</style>
