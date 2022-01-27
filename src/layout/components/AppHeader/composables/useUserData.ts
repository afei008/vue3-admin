/** @format */

import { useStore } from '@/store';
import { computed, ComputedRef } from 'vue';
import avatar from '@/assets/avatar.png';

interface UserDataTypes {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nickname: ComputedRef<any>;
  avatar: string;
}

export default function useUserData(): UserDataTypes {
  const store = useStore();

  const nickname = computed(() => store.getters['userState/nikename']);

  return {
    nickname,
    avatar,
  };
}
