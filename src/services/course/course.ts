/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-02-19 16:43:16
 * @LastEditors: Hexon
 * @LastEditTime: 2020-02-20 16:10:29
 */

import request from '@/utils/request';

export interface ICourse {
  number: string;
  name: string;
  category: string;
  collection: string;
  link: string;
  time: string;
  status: string;
  up: string; // 上架状态
  school: string; // 所属网校
}

export interface ICourseListsParamType {
  pageSize: number;
  curPage: number;
  keywords: string;
  category: string;
  status: string;
  up: string;
  school: string;
}

// 课程分类
export async function categoriesList() {
  return request('/api/course/course/categoriesList', {
    method: 'POST',
  });
}

// 所属网校
export async function schoolsList() {
  return request('/api/course/course/schoolsList', {
    method: 'POST',
  });
}

export async function list(params: ICourseListsParamType) {
  return request('/api/course/course/list', {
    method: 'POST',
    data: params,
  });
}

// 禁用或启用
export async function enable(params: { number: string }) {
  return request('/api/course/course/enable', {
    method: 'POST',
    data: params,
  });
}

export default {
  categoriesList,
  schoolsList,
  list,
  enable,
};
