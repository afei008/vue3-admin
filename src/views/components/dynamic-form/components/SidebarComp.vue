<!-- @format -->

<template>
  <div class="sidebar">
    <el-collapse v-model:activeKey="activeKey">
      <el-collapse-item key="1" title="基础">
        <div class="flex">
          <el-input v-model:value="prop.name">
            <template #prefix>
              <div class="addon-before">绑定值</div>
            </template>
          </el-input>
          <el-input v-model:value="prop.label">
            <template #prefix>
              <div class="addon-before">标签</div>
            </template>
          </el-input>
        </div>
        <div class="flex">
          <el-input v-if="prop.attrs" v-model="prop.attrs.placeholder">
            <template #prefix>
              <div class="addon-before">占位符</div>
            </template>
          </el-input>
        </div>
      </el-collapse-item>
      <el-collapse-item title="默认值">
        <el-input v-if="prop.type === 'Text'" v-model="prop.value" />
        <el-select
          v-if="prop.type === 'Select'"
          ref="select"
          v-model="prop.value"
          :options="prop.options"
          placeholder="请选择"
        >
          <el-option
            v-for="item in prop.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-checkbox-group
          v-if="prop.type === 'Checkbox'"
          v-model="prop.value"
          name="checkboxgroup"
        >
          <el-checkbox
            v-for="item in prop.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-checkbox-group>
      </el-collapse-item>
    </el-collapse>
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
