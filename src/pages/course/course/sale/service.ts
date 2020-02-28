/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-02-27 15:09:28
 * @LastEditors: Hexon
 * @LastEditTime: 2020-02-27 17:00:41
 */
import request from '@/utils/request';
import { joinListTranslator } from './translators';

export interface IJoinListParamsType extends IPageParams {
  data: {
    keywords: string;
    courseNumber: string;
  };
}

// 报名列表
async function joinList(params: IJoinListParamsType) {
  const resp = await request('/api/course/sale/joinList', {
    method: 'POST',
    data: params,
  });
  return joinListTranslator(resp);
}

// 课程详情
async function courseDetail(params: { courseNumber: string }) {
  return request('/api/course/sale/courseDetail', {
    method: 'POST',
    data: params,
  });
}

// 更新状态
async function updateStatus(params: { courseNumber: string }) {
  return request('/api/course/sale/updateStatus', {
    method: 'POST',
    data: params,
  });
}

export default {
  joinList,
  courseDetail,
  updateStatus,
};
