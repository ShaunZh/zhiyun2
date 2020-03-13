import request from '@/utils/request';
export async function feedbackList(params: { curPage: number }) {
  return request('/system/feedback/list', {
    method: 'POST',
    data: params,
  });
}

export default {
  feedbackList,
};
