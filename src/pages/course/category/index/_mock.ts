/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-02-25 15:36:51
 * @LastEditors: Hexon
 * @LastEditTime: 2020-02-28 15:33:52
 */
import mockjs from 'mockjs';

export default {
  'POST /api/course/category/detail': mockjs.mock({
    code: 200,
    result: {
      categoryName: '@first',
    },
  }),
  'POST /api/course/category/remove': mockjs.mock({
    code: 200,
  }),
  'POST /api/course/category/update': mockjs.mock({
    code: 200,
  }),
  'POST /api/course/category/create': mockjs.mock({
    code: 200,
  }),
  'POST /api/course/category/list': mockjs.mock({
    code: 200,
    result: {
      'data|1-10': [
        {
          number: '@id',
          id: '@id',
          categoryName: '@first',
          updateTime: '@date("yyyy-MM-dd hh:mm")',
        },
      ],
      total: 100,
    },
  }),
};
