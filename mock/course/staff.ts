/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-02-21 23:18:46
 * @LastEditors: Hexon
 * @LastEditTime: 2020-02-21 23:29:29
 */

import mockjs from 'mockjs';

export default {
  'POST /api/course/staff/list': (req: any, res: any) => {
    setTimeout(() => {
      res.send(
        mockjs.mock({
          code: 200,
          result: {
            page: {
              total: 100,
            },
            'data|10': [
              {
                number: '@id',
                id: '@id',
                name: '@first',
                'sex|1': [1, 2],
                intro: '@sentence',
              },
            ],
          },
        }),
      );
    }, 500);
  },
};
