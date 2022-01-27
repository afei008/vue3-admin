/** @format */

import { Module } from 'vuex';
import RootStateTypes from '@/store/interface';
import AppTagsStateTypes from './interface';

const hiddenList = ['/login'];

const appTagsState: Module<AppTagsStateTypes, RootStateTypes> = {
  state: {
    visitedViews: [],
    cachedViews: [],
  },
  getters: {
    visitedViews(state) {
      return state.visitedViews;
    },
    cachedViews(state) {
      return state.cachedViews;
    },
  },
  mutations: {
    ADD_VISITED_VIEW(state, view) {
      const index = state.visitedViews.findIndex(
        (item) => item.path === view.path,
      );
      if (index < 0 && !hiddenList.includes(view.path)) {
        state.visitedViews.push({
          ...view,
          ...{ title: view.meta.title || 'no-title' },
        });
      } else {
        const hasViews = state.visitedViews[index];
        if (hasViews && hasViews.fullPath !== view.fullPath) {
          // 当 query 不同时更改保存的路由数据
          state.visitedViews.splice(index, 1, { ...hasViews, ...view });
        }
      }
    },
    ADD_CACHED_VIEW(state, view) {
      if (!state.cachedViews.includes(view.name) && !view.meta.noCache) {
        state.cachedViews.push(view.name);
      }
    },
    DEL_VISITED_VIEW(state, view) {
      state.visitedViews = state.visitedViews.filter(
        (item) => item.path !== view.path,
      );
    },
    DEL_CACHED_VIEW(state, view) {
      state.cachedViews = state.cachedViews.filter(
        (item) => item !== view.name,
      );
    },
    DEL_OTHER_VISITED_VIEWS(state, view) {
      state.visitedViews = state.visitedViews.filter(
        (item) => item.path === view.path,
      );
    },
    DEL_OTHER_CACHED_VIEWS(state, view) {
      state.cachedViews = state.cachedViews.filter(
        (item) => item === view.name,
      );
    },
    DEL_ALL_VISITED_VIEWS(state) {
      state.visitedViews = [];
    },
    DEL_ALL_CACHED_VIEWS(state) {
      state.cachedViews = [];
    },
  },
  actions: {
    addView({ dispatch }, view) {
      dispatch('addVisitedView', view);
      dispatch('addCachedView', view);
    },
    addVisitedView({ commit }, view) {
      commit('ADD_VISITED_VIEW', view);
    },
    addCachedView({ commit }, view) {
      commit('ADD_CACHED_VIEW', view);
    },
    delView({ dispatch, state }, view) {
      return new Promise((resolve) => {
        dispatch('delVisitedView', view);
        dispatch('delCachedView', view);
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews],
        });
      });
    },
    delVisitedView({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEW', view);
        resolve([...state.visitedViews]);
      });
    },
    delCachedView({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_CACHED_VIEW', view);
        resolve([...state.cachedViews]);
      });
    },
    delOthersViews({ dispatch, state }, view) {
      return new Promise((resolve) => {
        dispatch('delOthersVisitedViews', view);
        dispatch('delOthersCachedViews', view);
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews],
        });
      });
    },
    delOthersVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHER_VISITED_VIEWS', view);
        resolve([...state.visitedViews]);
      });
    },
    delOthersCachedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHER_CACHED_VIEWS', view);
        resolve([...state.cachedViews]);
      });
    },
    delAllViews({ dispatch, state }) {
      return new Promise((resolve) => {
        dispatch('delAllVisitedViews');
        dispatch('delAllCachedViews');
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews],
        });
      });
    },
    delAllVisitedViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VISITED_VIEWS');
        resolve([...state.visitedViews]);
      });
    },
    delAllCachedViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_CACHED_VIEWS');
        resolve([...state.cachedViews]);
      });
    },
  },
};

export default appTagsState;
