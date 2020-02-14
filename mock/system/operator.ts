import mockjs from 'mockjs';
import { Request, Response } from 'express';

export default {
  'POST /api/system/operator/list': (req: any, res: any) => {
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
                account: '@id',
                operator: '@first',
                mobile: '1212121',
                'role|1': ['管理员', '超级管理员'],
                'status|1': ['已启用', '已禁用'],
                time: '@datetime',
              },
            ],
          },
        }),
      );
    }, 3000);
  },
  'POST /api/system/operator/statusOptions': mockjs.mock({
    'result|1-5': [
      {
        label: '@word(3, 5)',
        value: '@id',
      },
    ],
  }),
  'POST /api/system/operator/create': (req: any, res: any) => {
    setTimeout(
      () =>
        res.send({
          code: 200,
        }),
      10000,
    );
  },

  'POST /api/system/operator/roleOptions': mockjs.mock({
    code: 200,
    'result|1-5': [
      {
        label: '@first',
        value: '@id',
      },
    ],
  }),
  'POST /api/system/operator/detail': mockjs.mock({
    code: 200,
    result: {
      number: '@id',
      account: '@id',
      operator: '@first',
      mobile: '1212121',
      'role|1': ['管理员', '超级管理员'],
      'status|1': ['已启用', '已禁用'],
      time: '@datetime',
    },
  }),
  'POST /api/system/operator/update': mockjs.mock({
    code: 200,
  }),
  'POST /api/system/operator/remove': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        code: 200,
      });
    }, 3000);
  },
};
