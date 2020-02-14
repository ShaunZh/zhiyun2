import request from '@/utils/request';

export interface IOperatorsListsParamType {
  keywords: string;
  status: string;
  pageSize: number;
  curPage: number;
}

export interface IOperator {
  number: string;
  account: string;
  operator: string;
  mobile: string;
  role: string;
  status: string;
  time: string;
}

export interface ISubmitOperatorParamType {
  account: string;
  operator: string;
  mobile: string;
  role: string;
}

export interface ISubmitOperatorEditParamType extends ISubmitOperatorParamType {
  number: string;
}

export async function list(params: IOperatorsListsParamType) {
  return request('/api/system/operator/list', {
    method: 'POST',
    data: params,
  });
}

export async function statusOptions() {
  return request('/api/system/operator/statusOptions', {
    method: 'POST',
  });
}

export async function create(params: ISubmitOperatorParamType) {
  return request('/api/system/operator/create', {
    method: 'POST',
    data: params,
  });
}

export async function roleOptions() {
  return request('/api/system/operator/roleOptions', {
    method: 'POST',
  });
}

export async function detail(params: { number: string }) {
  return request('/api/system/operator/detail', {
    method: 'POST',
    data: params,
  });
}

export async function update(params: ISubmitOperatorEditParamType) {
  return request('/api/system/operator/update', {
    method: 'POST',
    data: params,
  });
}

export async function remove(params: { number: string }) {
  return request('/api/system/operator/remove', {
    method: 'POST',
    data: params,
  });
}

export default {
  list,
  statusOptions,
  create,
  update,
  roleOptions,
  detail,
  remove,
};
