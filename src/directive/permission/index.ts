/** @format */

import { DirectiveBinding } from 'vue';
import store from '@/store';

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding;
  const roles = store.getters['userState/roles'];

  if (Array.isArray(value)) {
    if (value.length > 0) {
      const hasPermission = roles.some((role: Array<string>) => value.includes(role));
      if (!hasPermission && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }
  } else {
    throw new Error("need roles! Like v-permission=\"['admin','editor']\"");
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding): void {
    checkPermission(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding): void {
    checkPermission(el, binding);
  },
};
