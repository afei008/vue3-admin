/** @format */

import UserStateTypes from './modules/user/interface';
import PermissionStateTypes from './modules/permission/interface';

export default interface RootStateTypes {
  test: string;
}

export interface AllStateTypes extends RootStateTypes {
  userState: UserStateTypes;
  permissionState: PermissionStateTypes;
}
