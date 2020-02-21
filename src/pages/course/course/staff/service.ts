/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-02-21 23:16:37
 * @LastEditors: Hexon
 * @LastEditTime: 2020-02-21 23:25:03
 */
import request from '@/utils/request';

export interface IStaff {
  number: string;
  name: string;
  id: string;
  status: number;
  intro: string;
}

export interface IListParamsType {
  pageSize: number;
  curPage: number;
  keywords: string;
  type: string;
}

async function list(params: IListParamsType) {
  return request('/api/course/staff/list', {
    method: 'POST',
    data: params,
  });
}

export default {
  list,
};
