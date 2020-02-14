import mockjs from 'mockjs';
import { Request, Response } from 'express';

export default {
  'POST /api/system/message/list': (req: any, res: any) => {
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
                title: '@first',
                content: '@csentence',
                time: '@datetime',
              },
            ],
          },
        }),
      );
    }, 3000);
  },
  'POST /api/system/message/statusOptions': mockjs.mock({
    'result|1-5': [
      {
        label: '@word(3, 5)',
        value: '@id',
      },
    ],
  }),
  'POST /api/system/message/create': (req: any, res: any) => {
    setTimeout(
      () =>
        res.send({
          code: 200,
        }),
      10000,
    );
  },

  'POST /api/system/message/roleOptions': mockjs.mock({
    code: 200,
    'result|1-5': [
      {
        label: '@first',
        value: '@id',
      },
    ],
  }),
  'POST /api/system/message/detail': mockjs.mock({
    code: 200,
    result: {
      number: '@id',
      title: '@first',
      content: '@csentence',
      time: '@datetime',
    },
  }),
  'POST /api/system/message/update': mockjs.mock({
    code: 200,
  }),
  'POST /api/system/message/remove': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        code: 200,
      });
    }, 3000);
  },
};
