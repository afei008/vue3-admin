<!-- @format -->

<template>
  <div class="sidebar">
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel key="1" header="基础">
        <div class="flex">
          <a-input v-model:value="prop.name">
            <template #addonBefore>
              <div class="addon-before">绑定值</div>
            </template>
          </a-input>
          <a-input v-model:value="prop.label">
            <template #addonBefore>
              <div class="addon-before">标签</div>
            </template>
          </a-input>
        </div>
        <div class="flex">
          <a-input v-if="prop.attrs" v-model:value="prop.attrs.placeholder">
            <template #addonBefore>
              <div class="addon-before">占位符</div>
            </template>
          </a-input>
        </div>
      </a-collapse-panel>
      <a-collapse-panel header="默认值">
        <a-input v-if="prop.type === 'Text'" v-model:value="prop.value" />
        <a-select
          v-if="prop.type === 'Select'"
          ref="select"
          v-model:value="prop.value"
          :options="prop.options"
          placeholder="请选择"
        />
        <a-checkbox-group
          v-if="prop.type === 'Checkbox'"
          v-model:value="prop.value"
          name="checkboxgroup"
          :options="prop.options"
        />
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script setup lang="ts" name="SidebarComp">
import { ref, toRefs } from 'vue';
import activeComp from './DynamicForm/composables/activeComp';

const activeKey = ref(['1']);

const { prop } = toRefs(activeComp);
</script>

<style lang="scss" scoped>
.sidebar {
  height: calc(100vh - 204px);

  & > .flex:not(:last-child) {
    margin-bottom: 10px;
  }

  .flex {
    & + .flex {
      margin-top: 10px;
    }

    & > * {
      flex: 1;
    }
  }

  .addon-before {
    width: 3em;
  }
}
</style>
