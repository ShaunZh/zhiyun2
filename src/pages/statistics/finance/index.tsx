import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { DatePicker, Button, Tabs } from 'antd';
import styles from './index.less';
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
// import financeAPI from '@/services/statistics/finance';
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
// import moment from 'moment'
interface Istate {
  orders: Array<number> | [];
  money: Array<number> | [];
}
class Finance extends React.Component<{}, Istate> {
  state: Istate = {
    orders: [],
    money: [],
  };

  componentDidMount() {}
  initCharts = () => {
    const { orders, money } = this.state;
    var myChart1 = echarts.init(document.getElementById('main1'));
    var myChart2 = echarts.init(document.getElementById('main2'));
    myChart1.setOption({
      xAxis: {
        type: 'category',
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月',
        ],
      },
      tooltip: {},
      yAxis: {},
      series: [
        {
          data: orders,
          type: 'line',
          smooth: true,
          areaStyle: {},
        },
      ],
    });
    myChart2.setOption({
      xAxis: {
        type: 'category',
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月',
        ],
      },
      tooltip: {},
      yAxis: {},
      series: [
        {
          data: money,
          type: 'line',
          smooth: true,
          areaStyle: {},
        },
      ],
    });
  };
  //导出数据，生成图表
  output = () => {
    this.setState(
      {
        orders: [500, 600, 600, 600, 500, 500, 600, 600, 600, 500, 200, 200],
        money: [2000, 3500, 4000, 1000, 6000, 2000, 3500, 4000, 1000, 6000, 4500, 4500],
      },
      () => {
        this.initCharts();
      },
    );
  };
  chooseDate = (date: any, dateString: [string, string]) => {
    console.log(date, dateString);
  };
  render() {
    return (
      <div>
        <PageHeaderWrapper className={styles.main} />
        <div className={styles.bottomBox}>
          <div className={styles.datepicker}>
            <span>时间: </span>
            <RangePicker onChange={this.chooseDate} />
            <Button type="primary" className={styles.btn} onClick={this.output}>
              导出
            </Button>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.top}>订单数</div>
              <div></div>
            </div>
            <div className={styles.col}>
              <div className={styles.top}>订单总额</div>
              <div></div>
            </div>
          </div>
          <Tabs
            defaultActiveKey="1"
            className={styles.tab}
            tabBarExtraContent={<Button>下载</Button>}
          >
            <TabPane tab="订单数" key="1" forceRender={true} className={styles.tabPhane}>
              <div className={styles.unit}>单位（个）</div>
              <div id="main1" className={styles.echarts}></div>
            </TabPane>
            <TabPane tab="订单总额" key="2" forceRender={true} className={styles.tabPhane}>
              <div className={styles.unit}>单位（元）</div>
              <div id="main2" className={styles.echarts}></div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default Finance;
