import mockjs from 'mockjs';
export default {
  'GET /api/platform/hotkeyword/leftlist': (req: any, res: any) => {
    setTimeout(() => {
      res.send(
        mockjs.mock({
          code: 200,
          result: ['flower', 'tree', 'lake'],
        }),
      );
    }, 3000);
  },
  'GET /api/platform/hotkeyword/righttable': (req: any, res: any) => {
    setTimeout(() => {
      res.send(
        mockjs.mock({
          code: 200,
          result: {
            'data|3': [
              {
                'rank|+1': 1,
                keyword: 'house',
                times: 234,
              },
            ],
          },
        }),
      );
    }, 3000);
  },
};
