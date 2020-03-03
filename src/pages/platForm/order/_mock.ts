import mockjs from 'mockjs';
export default {
  'POST /api/platform/orders': (req: any, res: any) => {
    setTimeout(() => {
      res.send(
        mockjs.mock({
          code: 200,
          result: {
            'data|10': [
              {
                'No|+1': 1,
                'orderAccount|+1': 1997,
                school: 'xx网校',
                classTitle: 'xx课程',
                price: 2333,
                user: 'xx用户',
                tel: '1435554',
                'payWay|1': ['微信', '支付宝', '银联'],
                time: '@datetime',
                'status|1': ['已付款', '未付款'],
              },
            ],
            total: 100,
          },
        }),
      );
    }, 3000);
  },
};
