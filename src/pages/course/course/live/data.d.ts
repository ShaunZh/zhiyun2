/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-02-24 16:27:21
 * @LastEditors: Hexon
 * @LastEditTime: 2020-02-26 18:43:57
 */

// 后端返回的总管理员数据
export interface IMasterAdmin {
  id: string;
  name: string;
  sex: string;
  startTime: string;
  endTime: string;
}

// 直播间详情列表
export interface ILiveInfoItem {
  tAdminData: Array<IMasterAdmin>;
  courseName: string;
  courseNumber: string;
  liveStartTime: string;
  liveEndTime: string;
}
