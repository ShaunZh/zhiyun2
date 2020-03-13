/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-03-10 17:33:32
 * @LastEditors: Hexon
 * @LastEditTime: 2020-03-10 17:36:35
 */
export const TokenKey = 'token';

export function getToken(): string {
  return sessionStorage.getItem(TokenKey) || '';
}

export function setToken(token: string) {
  sessionStorage.setItem(TokenKey, token);
}

export function removeToken() {
  sessionStorage.removeItem(TokenKey);
}
