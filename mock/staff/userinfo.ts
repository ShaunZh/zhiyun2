import mockjs from 'mockjs';
export default {
  'POST /api/staff/userinfo/data': (req: any, res: any) => {
    setTimeout(() => {
      res.send(
        mockjs.mock({
          code: 200,
          result: {
            tableList: {
              total: 100,
              'data|10': [
                {
                  'No|+1': 1,
                  'ID|+1': 1997,
                  avator: '',
                  nickName: '@first',
                  'sex|1': ['男', '女'],
                  tel: '12345677654',
                  loginTime: 3,
                  registerTime: '@datetime',
                  'identity|1': ['管理员', '超级管理员'],
                  'status|1': ['黑名单', '正常'],
                },
              ],
            },
          },
        }),
      );
    }, 3000);
  },
};
