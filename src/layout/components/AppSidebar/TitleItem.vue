<!-- @format -->

<script lang="ts">
import IconFont from '@/components/IconFont/index.vue';
import { defineComponent, h } from 'vue';

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
  render() {
    const vnodes = [];
    if (this.icon) {
      vnodes.push(
        h(IconFont, {
          type: this.icon,
          class: 'menu-icon',
        }),
      );
    }
    if (this.title) {
      vnodes.push(h('span', { class: 'menu-text' }, this.title));
    }
    return h('span', { class: 'menu-title' }, vnodes);
  },
});
</script>
<style lang="scss" scoped>
.menu-title {
  display: flex;
  align-items: center;
  .menu-icon {
    margin-right: 15px;
  }
}
</style>
