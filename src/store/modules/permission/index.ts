/** @format */

import { Module } from 'vuex';
import { RouteRecordName, RouteRecordRaw } from 'vue-router';
import RootStateTypes from '@/store/interface';
import asyncRoutes from '@/router/modules/asyncRoutes';
import constantRoutes from '@/router/modules/constant';
import router from '@/router';
import PermissionStateTypes from './interface';

let noAutoRouteNames: Array<RouteRecordName> = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function hasPermission(roles: Array<string>, route: any) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route?.meta?.roles?.includes(role));
  }
  return true;
}

function filterAsyncRoutes(
  routes: Array<RouteRecordRaw>,
  roles: Array<string>,
): Array<RouteRecordRaw> {
  const res: Array<RouteRecordRaw> = [];
  routes.forEach((route) => {
    const temp = { ...route };
    if (hasPermission(roles, temp)) {
      if (temp.children) {
        temp.children = filterAsyncRoutes(temp.children, roles);
      }
      res.push(temp);
    } else {
      noAutoRouteNames.push(temp.name as RouteRecordName);
    }
  });

  return res;
}

function filterNoRouteName(
  routes: Array<RouteRecordRaw>,
): Array<RouteRecordRaw> {
  const res: Array<RouteRecordRaw> = [];
  routes.forEach((item: RouteRecordRaw) => {
    const temp = { ...item };
    if (!noAutoRouteNames.includes(temp.name as RouteRecordName)) {
      if (temp.children) {
        temp.children = filterNoRouteName(temp.children);
      }
      res.push(temp);
    }
  });
  return res;
}

function addRoutes(routes: Array<RouteRecordRaw>): void {
  const currRoutes = router.options.routes;

  routes.forEach((item: RouteRecordRaw) => {
    const index = currRoutes.findIndex((it) => it.path === item.path);
    if (index < 0) {
      currRoutes.push(item);
    } else {
      currRoutes[index] = item;
    }
  });
  currRoutes.map((item) => router.addRoute(item));
}

function removeRoutes(): Array<RouteRecordRaw> {
  const currRoutes = router.options.routes;
  noAutoRouteNames.forEach((item: RouteRecordName) => {
    if (router.hasRoute(item)) {
      router.removeRoute(item);
    }
  });
  const res = filterNoRouteName(currRoutes);
  noAutoRouteNames = [];
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

        addRoutes(accessRoutes);

        const targetRoutes = removeRoutes();
        router.options.routes = targetRoutes;

        commit('SET_ROUTES', targetRoutes);
        resolve(targetRoutes);
      });
    },
  },
};

export default permissionState;
