/** @format */

import { RouteRecord } from 'vue-router';
import router from './router';
import store from './store';

const whiteList = ['/login'];

// 暂时没有好方法能不使用 next 进行路由拦截
router.beforeEach(async (to, from, next) => {
  const hasToken = store.getters['userState/token'];
  if (!hasToken) {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next('/login');
    }
  } else {
    const roles = store.getters['userState/cacheRoles'];
    if (roles && roles.length > 0) {
      next();
    } else {
      try {
        const newRoutes = await store.dispatch('userState/changeRoles', roles);
        // 获取到路由之后再添加 404 路由，否则会跳转到 404
        newRoutes.push({
          path: '/:pathMatch(.*)*',
          redirect: '/404',
          meta: { hidden: true },
        });
        newRoutes.map((item: RouteRecord) => router.addRoute(item));
        next({ ...to, replace: true });
      } catch {
        await store.dispatch('userState/resetState');
        next('/login');
      }
    }
  }
});
