/** @format */

export default interface UserStateTypes {
  token: string;
  roles: Array<string> | null;
  cacheRoles: Array<string> | null;
  nickname: string;
}
