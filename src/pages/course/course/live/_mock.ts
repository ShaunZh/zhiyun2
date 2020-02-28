/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-02-25 15:36:51
 * @LastEditors: Hexon
 * @LastEditTime: 2020-02-26 18:28:12
 */
import mockjs from 'mockjs';

export default {
  'POST /api/course/live/liveInfoByType': mockjs.mock({
    code: 200,
    result: {
      'data|5': [
        {
          number: '@id',
          id: '@id',
          name: '@first',
          'sex|1': [1, 2],
          startTime: '@date("yyyy-MM-dd hh:mm")',
          endTime: '@date("yyyy-MM-dd hh:mm")',
          'fileList|1-5': [
            {
              name: '@csentence(3, 5)',
              number: '@id',
            },
          ],
          filesUrl: 'http://baidu.com',
          question: '@csentence(3, 20)',
          questionNumber: '@id',
        },
      ],
    },
  }),
  'POST /api/course/live/list': mockjs.mock({
    code: 200,
    result: {
      'data|1-10': [
        {
          courseNumber: '@id',
          courseName: '@csentence(5, 30)',
          liveStartTime: '@date("yyyy-MM-dd hh:mm")',
          liveEndTime: '@date("yyyy-MM-dd hh:mm")',
          'tAdminData|1-5': [
            {
              'sex|1': [1, 2],
              startTime: '@date("yyyy-MM-dd hh:mm")',
              endTime: '@date("yyyy-MM-dd hh:mm")',
              name: '@csentence(3, 10)',
              id: '@id',
            },
          ],
        },
      ],
    },
  }),
};
