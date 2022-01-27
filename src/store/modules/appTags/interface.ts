/** @format */

import { RouteLocation } from 'vue-router';

export default interface AppTagsStateTypes {
  visitedViews: Array<RouteLocation>;
  cachedViews: Array<string>;
}
