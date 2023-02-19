/** @format */

import { defineStore } from 'pinia';
import type { RouteLocation } from 'vue-router';

const hiddenList = ['/login'];

export interface State {
  visitedViews: Array<RouteLocation>;
  cachedViews: Array<string>;
}

export const useAppTagsStore = defineStore({
  id: 'appTags',
  state: (): State => ({
    visitedViews: [],
    cachedViews: [],
  }),
  actions: {
    addView(view: RouteLocation) {
      this.addVisitedView(view);
      this.addCachedView(view);
    },
    addVisitedView(view: RouteLocation) {
      const index = this.visitedViews.findIndex(
        (item) => item.path === view.path
      );
      if (index < 0 && !hiddenList.includes(view.path)) {
        this.visitedViews.push({
          ...view,
          ...{ title: view.meta.title || 'no-title' },
        });
      } else {
        const hasViews = this.visitedViews[index];
        if (hasViews && hasViews.fullPath !== view.fullPath) {
          // 当 query 不同时更改保存的路由数据
          this.visitedViews.splice(index, 1, { ...hasViews, ...view });
        }
      }
    },
    addCachedView(view: RouteLocation) {
      // @ts-ignore 程序需要
      if (!this.cachedViews.includes(view.name) && !view.meta.noCache) {
        // @ts-ignore 程序需要
        this.cachedViews.push(view.name);
      }
    },
    delView(view: RouteLocation) {
      return new Promise((resolve) => {
        this.delVisitedView(view);
        this.delCachedView(view);
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delVisitedView(view: RouteLocation) {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter(
          (item) => item.path !== view.path
        );
        resolve([...this.visitedViews]);
      });
    },
    delCachedView(view: RouteLocation) {
      return new Promise((resolve) => {
        this.cachedViews = this.cachedViews.filter(
          (item) => item !== view.name
        );
        resolve([...this.cachedViews]);
      });
    },
    delOthersViews(view: RouteLocation) {
      return new Promise((resolve) => {
        this.delOthersVisitedViews(view);
        this.delOthersCachedViews(view);
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delOthersVisitedViews(view: RouteLocation) {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter(
          (item) => item.path === view.path
        );
        resolve([...this.visitedViews]);
      });
    },
    delOthersCachedViews(view: RouteLocation) {
      return new Promise((resolve) => {
        this.cachedViews = this.cachedViews.filter(
          (item) => item === view.name
        );
        resolve([...this.cachedViews]);
      });
    },
    delAllViews() {
      return new Promise((resolve) => {
        this.delAllVisitedViews();
        this.delAllCachedViews();
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delAllVisitedViews() {
      return new Promise((resolve) => {
        this.visitedViews = [];
        resolve([...this.visitedViews]);
      });
    },
    delAllCachedViews() {
      return new Promise((resolve) => {
        this.cachedViews = [];
        resolve([...this.cachedViews]);
      });
    },
  },
});
