/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-02-27 15:09:40
 * @LastEditors: Hexon
 * @LastEditTime: 2020-02-28 10:56:47
 */
/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-02-25 15:36:51
 * @LastEditors: Hexon
 * @LastEditTime: 2020-02-26 18:28:12
 */
import mockjs from 'mockjs';

export default {
  'POST /api/course/sale/joinList': mockjs.mock({
    code: 200,
    result: {
      'data|1-10': [
        {
          number: '@id',
          name: '@first',
          'sex|1': ['1', '2'],
          contact: '1322223333',
          email: 'baidu@baidu.com',
          likeCourse: '课程',
          joinTime: '@date("yyyy-MM-dd hh:mm")',
        },
      ],
      total: 30,
    },
  }),
  'POST /api/course/sale/courseDetail': mockjs.mock({
    code: 200,
    result: {
      data: {
        key: '@id',
        name: '@first',
        number: '@id',
        intro: '@paragraph',
        price: '@natural(10, 99999)',
        sale: '@natural(1, 99999)', // 销售量
        collection: '@natural(1, 999999)', // 收藏数
        'status|1': ['Y', 'N'], // 状态
      },
    },
  }),
  'POST /api/course/sale/updateStatus': mockjs.mock({
    code: 200,
  }),
};
