import request from '@/utils/request';
export async function schoolList(params:{curPage:number}) {
  return request('/api/platform/school', {
    method: 'POST',
    data: params,
  });
}
export async function customerServiceList(params:{schoolAccount:string}) {
  return request('/api/platform/customerservice', {
    method: 'POST',
    data: params,
  });
}
export default {
    schoolList,
    customerServiceList
};