/** @format */

import { Module } from 'vuex';
import { RouteRecordRaw } from 'vue-router';
import RootStateTypes from '@/store/interface';
import asyncRoutes from '@/router/modules/asyncRoutes';
import constantRoutes from '@/router/modules/constant';
import PermissionStateTypes from './interface';

function hasPermission(roles: Array<string>, route: any) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  }
  return true;
}

export function filterAsyncRoutes(
  routes: Array<RouteRecordRaw>,
  roles: Array<string>,
): Array<RouteRecordRaw> {
  const res: Array<RouteRecordRaw> = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const permissionState: Module<PermissionStateTypes, RootStateTypes> = {
  state: {
    newRoutes: constantRoutes,
  },
  getters: {
    newRoutes(state) {
      return state.newRoutes;
    },
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.newRoutes = routes;
    },
  },
  actions: {
    generateRoutes({ commit }, roles: Array<string>) {
      return new Promise((resolve) => {
        let accessRoutes;
        if (roles.includes('admin')) {
          accessRoutes = asyncRoutes || [];
        } else {
          accessRoutes = filterAsyncRoutes(asyncRoutes, roles);
        }

        resolve(accessRoutes);
      });
    },
    changeRoutes({ commit }, routes) {
      commit('SET_ROUTES', routes);
    },
  },
};

export default permissionState;
