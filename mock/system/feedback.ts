import mockjs from 'mockjs';
export default {
  'POST /api/system/feedback/list': (req: any, res: any) => {
    setTimeout(() => {
      res.send(
        mockjs.mock({
          code: 200,
          result: {
            feedbackList: {
              total: 100,
              'data|10': [
                {
                  'No|+1': 1,
                  'ID|+1': 1997,
                  content: '@csentence',
                  user: '@first',
                  tel: '13567898907',
                  time: '@datetime',
                  operator: '@first',
                  'status|1': ['未处理', '已处理'],
                },
              ],
            },
          },
        }),
      );
    }, 3000);
  },
};
