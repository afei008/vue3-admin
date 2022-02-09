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
import { login, logout } from '@/api/user';
import { LoginParams } from '@/api/user/interface';
import UserStateTypes from './interface';

const defaultState = () => ({
  token: getToken(),
  roles: getRoles(),
  cacheRoles: null,
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
    cacheRoles(state) {
      return state.cacheRoles;
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
    SET_CACHE_ROLES(state, roles) {
      state.cacheRoles = roles;
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
    async logout({ commit, dispatch }) {
      return logout().then(() => {
        commit('RESET_STATE');
        dispatch('appTagsState/delAllViews', null, { root: true });
        router.push('/login');
      });
    },
    async resetState({ commit }) {
      commit('RESET_STATE');
    },
    async changeRoles(
      { commit, state, dispatch },
      roles: Array<string> | null,
    ) {
      const currRoles = roles || state.roles;
      commit('SET_ROLES', currRoles);
      commit('SET_CACHE_ROLES', currRoles);
      const accessRoutes = await dispatch(
        'permissionState/generateRoutes',
        currRoles,
        { root: true },
      );
      dispatch('appTagsState/delAllViews', null, { root: true });
      return accessRoutes;
    },
    changeNickname({ commit }, nickname) {
      commit('SET_NICKNAME', nickname);
    },
  },
};

export default userState;
