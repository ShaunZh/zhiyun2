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

// export interface IOperatorList {
//   list: Array<IOperator>;
// }

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

export default {
  list,
  statusOptions,
};
