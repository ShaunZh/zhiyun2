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
  return request('/system/message/list', {
    method: 'POST',
    data: params,
  });
}

export async function statusOptions() {
  return request('/system/message/statusOptions', {
    method: 'POST',
  });
}

export async function create(params: ISubmitMessageParamType) {
  return request('/system/message/create', {
    method: 'POST',
    data: params,
  });
}
export async function detail(params: { number: string }) {
  return request('/system/message/detail', {
    method: 'POST',
    data: params,
  });
}

export async function update(params: ISubmitMessageEditParamType) {
  return request('/system/message/update', {
    method: 'POST',
    data: params,
  });
}

export async function remove(params: { number: string }) {
  return request('/system/message/remove', {
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
