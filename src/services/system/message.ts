import request from '@/utils/request';

export interface IMessage {
  number: string;
  title: string;
  content: string;
  time: string;
}

export interface IMessagesListsParamType {
  keywords: string;
  status: string;
  pageSize: number;
  curPage: number;
}

export interface ISubmitMessageParamType {
  title: string;
  content: string;
}

export interface ISubmitMessageEditParamType extends ISubmitMessageParamType {
  number: string;
}

export async function list(params: IMessagesListsParamType) {
  return request('/api/system/message/list', {
    method: 'POST',
    data: params,
  });
}

export async function statusOptions() {
  return request('/api/system/message/statusOptions', {
    method: 'POST',
  });
}

export async function create(params: ISubmitMessageParamType) {
  return request('/api/system/message/create', {
    method: 'POST',
    data: params,
  });
}
export async function detail(params: { number: string }) {
  return request('/api/system/message/detail', {
    method: 'POST',
    data: params,
  });
}

export async function update(params: ISubmitMessageEditParamType) {
  return request('/api/system/message/update', {
    method: 'POST',
    data: params,
  });
}

export async function remove(params: { number: string }) {
  return request('/api/system/message/remove', {
    method: 'POST',
    data: params,
  });
}

export default {
  statusOptions,
  list,
  create,
  update,
  detail,
  remove,
};
