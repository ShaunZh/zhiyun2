/*
 * @Description: 后端返回数据的转换层，用于将后端返回的数据转换为符合前端使用的格式
 * @Author: Hexon
 * @Date: 2020-02-26 15:28:13
 * @LastEditors: Hexon
 * @LastEditTime: 2020-02-27 15:34:32
 */
import { ILiveInfoItem, IMasterAdmin } from './data.d';

export function liveInfoByTypeTranslator(resp: HttpResponse) {
  return {
    ...resp,
    result: {
      ...resp.result,
      // 此处item类型为object，是因为该接口返回的数据格式有三种，因此，且三种格式完全不同，因此设置为object，一般不允许设置这么宽松的类型
      data: resp.result.data.map((item: object, index: number) => ({
        ...item,
        No: index + 1,
        key: index,
      })),
    },
  };
}

// 列 liveItem: ILiveInfoItem)
export function listTranslator(resp: HttpResponse) {
  const {
    result: { data },
  } = resp;

  const newData = data.map((live: ILiveInfoItem) => {
    const { tAdminData } = live;
    const newTAdminData = tAdminData.map((admin: IMasterAdmin, index: number) => ({
      No: index + 1,
      key: admin.id || index,
      ...admin,
    }));
    return {
      ...live,
      tAdminData: newTAdminData,
    };
  });

  return {
    ...resp,
    result: {
      ...resp.result,
      data: newData,
    },
  };
}
