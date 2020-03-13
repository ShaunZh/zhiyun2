import request from '@/utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/oe--server-uaa/oauth/token', {
    method: 'GET',
    params,
    // requestType: 'form',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    // },
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/login/captcha?mobile=${mobile}`);
}
