<!-- @format -->

<template>
  <a-card title="这是信息窗体" style="width: 300px">
    <template #extra>
      <a-button type="text" danger @click="toggleCard">
        <template #icon><close-outlined /></template>
      </a-button>
    </template>
    <p>{{ firstName }}</p>
    <p>{{ lastName }}</p>
    <p>{{ alias }}</p>
    <p>昵称：{{ nickname }}</p>
  </a-card>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import { useUserStore } from '@/store/modules/user';

export default defineComponent({
  name: 'InfoWindow',
  components: { CloseOutlined },
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
