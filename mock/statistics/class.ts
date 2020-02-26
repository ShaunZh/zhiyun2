import mockjs from 'mockjs';

export default {
  'GET /api/statistics/class/category': (req: any, res: any) => {
    setTimeout(() => {
      res.send(
        mockjs.mock({
          code: 200,
          result: {
            classCategory: [
              {
                key: 1,
                category: '金融',
                amount: 345,
              },
              {
                key: 2,
                category: '政治',
                amount: 234,
              },
              {
                key: 3,
                category: '数学',
                amount: 127,
              },
              {
                key: 4,
                category: '英语',
                amount: 457,
              },
              {
                key: 5,
                category: '历史',
                amount: 57,
              },
              {
                key: 6,
                category: '文学',
                amount: 120,
              },
            ],
          },
        }),
      );
    }, 3000);
  },
};
