import request from '@/utils/request';
export async function userInfo(params: number) {
  return request('/api/staff/userinfo/data', {
    method: 'POST',
    data: params,
  });
}
// export async function yearData(params: number) {
//   return request('/api/statistics/finance/yeardata', {
//     method: 'POST',
//     data: params,
//   });
// }
export default {
    userInfo
};