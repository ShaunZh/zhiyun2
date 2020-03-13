import request from '@/utils/request';
export async function classCategory() {
  return request('/statistics/class/category', {
    method: 'GET',
  });
}
export default {
  classCategory,
};
