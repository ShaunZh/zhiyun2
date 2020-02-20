/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-02-20 17:02:49
 * @LastEditors: Hexon
 * @LastEditTime: 2020-02-20 17:55:40
 */
import request from '@/utils/request';

export interface ICourseResourcesParamType {
  pageSize: number;
  curPage: number;
  keywords: string;
  type: string;
}

export interface IResource {
  number: string;
  name: string;
  type: string;
  status: boolean;
}

export async function list(params: ICourseResourcesParamType) {
  return request('/api/course/resources/list', {
    method: 'POST',
    data: params,
  });
}

// 禁用或启用
export async function enable(params: { number: string }) {
  return request('/api/course/resources/enable', {
    method: 'POST',
    data: params,
  });
}

export default {
  list,
  enable,
};
