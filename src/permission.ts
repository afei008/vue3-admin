/** @format */

import router from './router';
import store from './store';

const whiteList = ['/login'];

router.beforeEach(async (to) => {
  if (whiteList.includes(to.path)) {
    return true;
  }
  const hasToken = store.getters['userState/token'];
  const roles = store.getters['userState/roles'];
  if (!hasToken) {
    return { path: '/login' };
  }
  try {
    await store.dispatch('userState/changeRoles', roles)
    return true
  } catch {
    await store.dispatch('userState/resetState')
    return { path: '/login' }
  }
});
