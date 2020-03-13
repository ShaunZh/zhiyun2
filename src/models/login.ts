import { Reducer } from 'redux';
import { Effect } from 'dva';
import { stringify } from 'querystring';
import { router } from 'umi';

import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { setToken } from '@/utils/token';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    getCaptcha: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const formData = new FormData();

      const newPayload = {
        client_id: 'zy-oe-client',
        client_secret: 'zy-oe-secret',
        grant_type: 'password',
        username: 'admin',
        password: '123456',
      };
      Object.keys(newPayload).forEach((key: string) => {
        formData.append(key, newPayload[key]);
      });
      const response = yield call(fakeAccountLogin, newPayload);
      yield put({
        type: 'changeLoginStatus',
        payload: response.result,
      });
      // window.location.href = '/';
      router.replace('/welcome');
      // Login successfully
      // if (response.code === 200) {
      //   const urlParams = new URL(window.location.href);
      //   const params = getPageQuery();
      //   let { redirect } = params as { redirect: string };
      //   if (redirect) {
      //     const redirectUrlParams = new URL(redirect);
      //     if (redirectUrlParams.origin === urlParams.origin) {
      //       redirect = redirect.substr(urlParams.origin.length);
      //       if (redirect.match(/^\/.*#/)) {
      //         redirect = redirect.substr(redirect.indexOf('#') + 1);
      //       }
      //     } else {
      //       window.location.href = '/';
      //       return;
      //     }
      //   }
      //   router.replace(redirect || '/');
      // }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    logout() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority('admin');
      setToken(`${payload.token_type} ${payload.access_token}`);

      return {
        ...state,
        status: 'ok',
        type: 'admin',
      };
    },
  },
};

export default Model;
