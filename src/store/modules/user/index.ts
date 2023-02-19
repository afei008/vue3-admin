/** @format */

import { defineStore } from 'pinia';
import { useAppTagsStore } from '../appTags';
import { usePermissionStore } from '../permission';
import {
  setToken,
  getToken,
  getRoles,
  setRoles,
  getNickname,
  setNickname,
} from '@/storage/user';
import router from '@/router';
import { login, logout } from '@/api/user';
import type { LoginParams } from '@/api/user/interface';

interface State {
  token: string;
  roles: Array<string> | null;
  cacheRoles: Array<string> | null;
  nickname: string;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): State => ({
    token: getToken(),
    roles: getRoles(),
    cacheRoles: null,
    nickname: getNickname(),
  }),
  actions: {
    async login(params: LoginParams) {
      await login(params).then((res) => {
        const { token, roles, nickname } = res.data;

        this.setToken(token);
        this.setRoles(roles);
        this.setNickname(nickname);

        router.push('/');
      });
    },
    async logout() {
      return logout().then(() => {
        this.resetState();
        const appTagsStore = useAppTagsStore();
        appTagsStore.delAllViews();
        router.push('/login');
      });
    },
    async changeRoles(roles: Array<string> | null) {
      const currRoles = roles || this.roles;
      this.setRoles(currRoles);
      this.setCacheRoles(currRoles);
      const permissionStore = usePermissionStore();
      const accessRoutes = await permissionStore.generateRoutes(
        currRoles as Array<string>
      );
      const appTagsStore = useAppTagsStore();
      appTagsStore.delAllViews();
      return accessRoutes;
    },
    changeNickname(nickname: string) {
      this.setNickname(nickname);
    },
    setToken(token: string) {
      this.token = token;
      setToken(token);
    },
    setRoles(roles: Array<string> | null) {
      this.roles = roles;
      setRoles(roles);
    },
    setCacheRoles(roles: Array<string> | null) {
      this.cacheRoles = roles;
    },
    setNickname(nickname: string) {
      this.nickname = nickname;
      setNickname(nickname);
    },
    resetState() {
      sessionStorage.clear();
      this.$reset();
    },
  },
});
