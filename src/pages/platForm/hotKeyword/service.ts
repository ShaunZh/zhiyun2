import request from '@/utils/request';
async function leftlist() {
  return request('/api/platform/hotkeyword/leftlist', {
    method: 'GET',
  });
}
async function righttable() {
    return request('/api/platform/hotkeyword/righttable', {
      method: 'GET',
    });
  }
export default {
    leftlist,
    righttable
};
