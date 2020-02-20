/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-02-20 18:09:44
 * @LastEditors: Hexon
 * @LastEditTime: 2020-02-20 18:19:39
 */
import mockjs from 'mockjs';

export default {
  'POST /api/course/resources/list': (req: any, res: any) => {
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
                name: '@first',
                type: '@first',
                'status|1': ['Y', 'N'],
              },
            ],
          },
        }),
      );
    }, 500);
  },
  'POST /api/course/resources/enable': {
    code: 200,
  },
};
