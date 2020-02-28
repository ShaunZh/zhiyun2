/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-02-24 16:54:43
 * @LastEditors: Hexon
 * @LastEditTime: 2020-02-26 16:55:00
 */

import request from '@/utils/request';
import { listTranslator, liveInfoByTypeTranslator } from './translators';

interface ILiveInfoByTypeParams extends IPageParams {
  data: {
    courseNumber: string;
    type: string;
  };
}

interface IListParams {
  liveDate: string;
}

export async function liveInfoByType(params: ILiveInfoByTypeParams) {
  const resp = await request('/api/course/live/liveInfoByType', {
    data: params,
    method: 'POST',
  });
  return liveInfoByTypeTranslator(resp);
}

async function list(params: IListParams) {
  const resp = await request('/api/course/live/list', {
    data: params,
    method: 'POST',
  });
  // 注意： 此处并没有直接将处理后的数据返回，而是将data数据处理后，按后台返回的数据格式返回，
  // 是为了保证所有调用api接口后数据处理的流程一致
  return listTranslator(resp);
}

export default {
  liveInfoByType,
  list,
};
