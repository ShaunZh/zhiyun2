import mockjs from 'mockjs';

export default {
  'POST /api/system/operator/list': (req, res) => {
    res.send(
      mockjs.mock({
        page: {
          total: '@integer(0, 100)',
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
      }),
    );
  },
  'POST /api/system/operator/statusOptions': mockjs.mock({
    'result|1-5': [
      {
        label: '@word(3, 5)',
        value: '@id',
      },
    ],
  }),
};
