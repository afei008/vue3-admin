<!-- @format -->

<template>
  <overlay-scrollbars-component defer>
    <ul class="dnd">
      <li
        v-for="item in shapeList"
        :key="item.shape"
        :class="['flex ac jc shape', item.shape]"
        @mousedown="dndState.drapShape($event, item.shape)"
      >
        <img
          v-if="item.shape === 'image'"
          style="max-width: 100%"
          :src="avatar"
        />
        <template v-else>
          {{ item.title }}
        </template>
      </li>
      <img src="" alt="" />
    </ul>
  </overlay-scrollbars-component>
</template>

<script lang="ts" setup name="DndComp">
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import avatar from '@/assets/images/avatar.png';
import { shapeList } from '../CustomShape';
import dndState from '../../composables/dndPlugin';
</script>

<style lang="scss" scoped>
.dnd {
  height: calc(100vh - 204px);
}

.shape {
  width: 50px;
  height: 50px;
  cursor: pointer;
  border: 1px solid $primary-color;

  &:not(:first-child) {
    margin-top: 10px;
  }

  &.circle {
    border-radius: 50%;
  }
}
</style>
