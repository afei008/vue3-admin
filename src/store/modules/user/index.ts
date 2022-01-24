/** @format */

import { Module } from 'vuex';
import RootStateTypes from '@/store/interface';
import {
  setToken,
  getToken,
  getRoles,
  setRoles,
  getNickname,
  setNickname,
} from '@/storage/user';
import router from '@/router';
import { RouteRecordRaw } from 'vue-router';
import { login, logout } from '@/api/user';
import { LoginParams } from '@/api/user/interface';
import UserStateTypes from './interface';

const defaultState = () => ({
  token: getToken(),
  roles: getRoles(),
  nickname: getNickname(),
});

const userState: Module<UserStateTypes, RootStateTypes> = {
  state: defaultState(),
  getters: {
    token(state) {
      return state.token;
    },
    roles(state) {
      return state.roles;
    },
    nickname(state) {
      return state.nickname;
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      setToken(token);
    },
    SET_ROLES(state, roles) {
      state.roles = roles;
      setRoles(roles);
    },
    SET_NICKNAME(state, nickname) {
      state.nickname = nickname;
      setNickname(nickname);
    },
    RESET_STATE() {
      sessionStorage.clear();
      defaultState();
    },
  },
  actions: {
    async login({ commit }, params: LoginParams) {
      await login(params).then((res) => {
        const { token, roles, nickname } = res.data;
        commit('SET_TOKEN', token);
        commit('SET_ROLES', roles);
        commit('SET_NICKNAME', nickname);

        router.push('/');
      });
    },
    async logout({ commit }) {
      return logout().then(() => {
        commit('RESET_STATE');
        router.push({ path: '/login' });
      });
    },
    async resetState({ commit }) {
      commit('RESET_STATE');
    },
    async changeRoles({ commit, dispatch }, roles: Array<string>) {
      commit('SET_ROLES', roles);

      const currRoutes = router.options.routes;
      const accessRoutes = await dispatch(
        'permissionState/generateRoutes',
        roles,
        { root: true },
      );

      accessRoutes.map((item: RouteRecordRaw) => {
        const index = currRoutes.findIndex((it) => it.path === item.path);
        if (index < 0) {
          currRoutes.push(item);
        } else {
          currRoutes[index] = item;
        }
        return null;
      });
      currRoutes.map((item) => router.addRoute(item));
      dispatch('permissionState/changeRoutes', [...currRoutes], { root: true });
    },
  },
};

export default userState;
