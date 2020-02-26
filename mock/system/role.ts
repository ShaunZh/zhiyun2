import mockjs from 'mockjs';
export default {
  'POST /api/system/role/list': (req: any, res: any) => {
    setTimeout(() => {
      res.send(
        mockjs.mock({
          code: 200,
          result: {
            roleList: {
              total: 100,
              'roleData|10': [
                {
                  'No|+1': 1,
                  'role|1': ['超级管理员', '管理员'],
                  time: '@datetime',
                  'rights|1': ['0-0-0', '0-1-0', '0-1-1'],
                },
              ],
            },
          },
        }),
      );
    }, 3000);
  },
  'GET /api/system/role/treedata': (req: any, res: any) => {
    setTimeout(() => {
      res.send(
        mockjs.mock({
          code: 200,
          result: {
            roleTreeData: [
              {
                title: '系统管理',
                value: '0-0',
                key: '0-0',
                children: [
                  {
                    title: '操作员管理',
                    value: '0-0-0',
                    key: '0-0-0',
                  },
                ],
              },
              {
                title: '统计分析',
                value: '0-1',
                key: '0-1',
                children: [
                  {
                    title: '财务统计',
                    value: '0-1-0',
                    key: '0-1-0',
                  },
                  {
                    title: '存储统计',
                    value: '0-1-1',
                    key: '0-1-1',
                  },
                  {
                    title: '课程统计',
                    value: '0-1-2',
                    key: '0-1-2',
                  },
                ],
              },
            ],
          },
        }),
      );
    }, 3000);
  },
};
