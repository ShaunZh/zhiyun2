import mockjs from 'mockjs';
export default {
  'POST /api/staff/userinfo/cloudinfo': (req: any, res: any) => {
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
                  updataFile: '',
                  updataTime: '@datetime',
                  status: '',
                },
              ],
            },
          },
        }),
      );
    }, 3000);
  },
};
