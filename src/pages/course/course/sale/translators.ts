/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-02-27 15:33:40
 * @LastEditors: Hexon
 * @LastEditTime: 2020-02-27 15:37:13
 */

export function joinListTranslator(resp: HttpResponse) {
  return {
    ...resp,
    result: {
      ...resp.result,
      data: resp.result.data.map((item: object, index: number) => ({
        ...item,
        No: index + 1,
        key: index,
      })),
    },
  };
}
