<!-- @format -->

<template>
  <el-card title="这是信息窗体" style="width: 300px">
    <template #header>
      <el-button type="danger" link @click="toggleCard">
        <el-icon><circle-close /></el-icon>
      </el-button>
    </template>
    <p>{{ firstName }}</p>
    <p>{{ lastName }}</p>
    <p>{{ alias }}</p>
    <p>昵称：{{ nickname }}</p>
  </el-card>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { CircleClose } from '@element-plus/icons-vue';
import { useUserStore } from '@/store/modules/user';

export default defineComponent({
  name: 'InfoWindow',
  components: { CircleClose },
  props: ['firstName', 'lastName', 'alias', 'getInfoWindow'],
  setup(props) {
    const userStore = useUserStore();

    const toggleCard = () => {
      const infoWindow = props.getInfoWindow();
      infoWindow.close();
    };
    return { toggleCard, nickname: computed(() => userStore.nickname) };
  },
});
</script>
