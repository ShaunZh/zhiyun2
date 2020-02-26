import request from '@/utils/request';
export async function tableList(params: {curPage:number,key:string}) {
  return request('/api/statistics/storage/tablelist', {
    method: 'POST',
    data: params,
  });
}
  export async function chartsData() {
    return request('/api/statistics/storage/chartsdata', {
      method: 'GET',
    });
  }
export default {
    tableList,
    chartsData
  }