import request from '@/utils/request';
export async function cloudinfo(params: number) {
  return request('/staff/userinfo/cloudinfo', {
    method: 'POST',
    data: params,
  });
}
export default {
  cloudinfo,
};
