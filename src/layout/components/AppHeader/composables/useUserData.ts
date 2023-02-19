/** @format */

import { computed, type ComputedRef } from 'vue';
import { useUserStore } from '@/store/modules/user';
import avatar from '@/assets/images/avatar.png';

interface UserDataTypes {
  nickname: ComputedRef<string>;
  avatar: string;
}

export default function useUserData(): UserDataTypes {
  const userStore = useUserStore();

  const nickname = computed(() => userStore.nickname);

  return {
    nickname,
    avatar,
  };
}
