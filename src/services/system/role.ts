import request from '@/utils/request';
export async function roleList(params: number) {
  return request('/system/role/list', {
    method: 'POST',
    data: params,
  });
}
export async function roleTreeData() {
  return request('/system/role/treedata', {
    method: 'GET',
  });
}
export default {
  roleList,
  roleTreeData,
};
