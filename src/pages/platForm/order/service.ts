import request from '@/utils/request';
async function orderTable(params: { curPage: number }) {
  return request('/api/platform/orders', {
    method: 'POST',
    data: params,
  });
}
export default {
  orderTable,
};
