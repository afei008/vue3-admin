/** @format */

export function setToken(token: string): void {
  sessionStorage.setItem('token', token);
}
export function getToken(): string {
  const token = sessionStorage.getItem('token') || '';
  return token;
}

export function setRoles(roles: Array<string> | null): void {
  sessionStorage.setItem('roles', JSON.stringify(roles));
}
export function getRoles(): Array<string> {
  const storage = sessionStorage.getItem('roles') || '';
  if (!storage) {
    return [];
  }
  const roles = JSON.parse(storage);
  return roles;
}

export function setNickname(nickname: string): void {
  sessionStorage.setItem('nickname', nickname);
}
export function getNickname(): string {
  const nickname = sessionStorage.getItem('nickname') || '';
  return nickname;
}
