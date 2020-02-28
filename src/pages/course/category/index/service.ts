/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-02-24 16:54:43
 * @LastEditors: Hexon
 * @LastEditTime: 2020-02-28 12:54:58
 */

import request from '@/utils/request';
import { listTranslator } from './translators';

interface IListParams extends IPageParams {
  data: {
    keywords: string;
  };
}
async function list(params: IListParams) {
  const resp = await request('/api/course/category/list', {
    data: params,
    method: 'POST',
  });

  // 注意： 此处并没有直接将处理后的数据返回，而是将data数据处理后，按后台返回的数据格式返回，
  // 是为了保证所有调用api接口后数据处理的流程一致
  return listTranslator(resp);
}

async function remove(params: { number: string }) {
  return request('/api/course/category/remove', {
    method: 'POST',
    data: params,
  });
}

async function update(params: { number: string; categoryName: string }) {
  return request('/api/course/category/update', {
    method: 'POST',
    data: params,
  });
}

async function create(params: { categoryName: string }) {
  return request('/api/course/category/create', {
    method: 'POST',
    data: params,
  });
}

async function detail(params: { number: string }) {
  return request('/api/course/category/detail', {
    method: 'POST',
    data: params,
  });
}
export default {
  list,
  create,
  update,
  remove,
  detail,
};
