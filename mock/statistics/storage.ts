import mockjs from 'mockjs';

export default {
  'POST /api/statistics/storage/tablelist': (req: any, res: any) => {
    setTimeout(() => {
      res.send(
        mockjs.mock({
          code: 200,
          result: {
            tableList: {
              total: 100,
              'data|10': [
                {
                  'key|+1':1,
                  'class|1': ['数学', '英语', '语文'],
                  'classKB|1': ['40kb', '20kb', '16kb'],
                  'storage|1': ['云盘一', '云盘二', '云盘三'],
                  'storageKB|1': ['5kb', '6kb', '8kb', '12kb'],
                },
              ],
            },
          },
        }),
      );
    }, 3000);
  },
  'GET /api/statistics/storage/chartsdata': (req: any, res: any) => {
    setTimeout(() => {
      res.send(
        mockjs.mock({
          code: 200,
          result: {
            chartsData: [
              { value: 80, name: '课程' },
              { value: 500, name: '云盘' },
              { value: 200, name: '剩余' },
            ],
          },
        }),
      );
    }, 2000);
  },
};
