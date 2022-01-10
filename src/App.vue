<!-- @format -->

<template>
  <a-config-provider :locale="zhCN">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
// 官方文档说更换成了 dayjs，但实际测试并没有更换，仍然是 moment，不知是否是未更新
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('en');

export default defineComponent({
  setup() {
    return {
      zhCN,
    };
  },
});
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
