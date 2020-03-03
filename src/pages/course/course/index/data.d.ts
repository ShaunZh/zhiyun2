/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-03-02 15:45:38
 * @LastEditors: Hexon
 * @LastEditTime: 2020-03-02 15:46:30
 */

//  列表查询参数
export interface IListQueryParams {
  curPage: number;
  pageSize: number;
  keywords: string;
  category: string;
  status: string;
  up: string;
  school: string;
}
