/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-02-19 17:01:30
 * @LastEditors: Hexon
 * @LastEditTime: 2020-02-20 16:10:57
 */

import mockjs from 'mockjs';
// import { Request, Response } from 'express';

export default {
  'POST /api/course/course/list': (req: any, res: any) => {
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
                category: '@first',
                collection: 123344,
                link: 'http://baidu.com',
                time: '@datetime',
                'status|1': ['Y', 'N'],
                'up|1': ['Y', 'N'],
                school: '阿里巴巴',
              },
            ],
          },
        }),
      );
    }, 500);
  },
  'POST /api/course/course/categoriesList': mockjs.mock({
    code: 200,
    'result|1-5': [
      {
        label: '@word(3, 5)',
        value: '@id',
      },
    ],
  }),
  'POST /api/course/course/schoolsList': mockjs.mock({
    code: 200,
    'result|1-5': [
      {
        label: '@word(3, 5)',
        value: '@id',
      },
    ],
  }),
  'POST /api/course/course/enable': {
    code: 200,
  },
};
