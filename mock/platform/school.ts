import mockjs from 'mockjs';
export default {
  'POST /api/platform/school': (req: any, res: any) => {
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
                  account: '1245',
                  logo: '',
                  title: 'abcdrfg',
                  masterID: '1223',
                  masterName: '@first',
                  tel: '13423545',
                  registerTime: '@datetime',
                  'status|1': ['已启用', '已禁用'],
                  score: 9,
                },
              ],
            },
          },
        }),
      );
    }, 3000);
  },
  'POST /api/platform/customerservice': (req: any, res: any) => {
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
                  ID: '1242344255',
                  name: 'xx客服 ',
                },
              ],
            },
          },
        }),
      );
    }, 3000);
  },
};
