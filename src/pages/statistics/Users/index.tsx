import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DefinedDatePicker from '@/components/DefinedDatePicker';
import TabCharts from './components/TabCharts';
import styles from './index.less';
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
interface IState {
  spankey: string;
  xdata: Array<string> | [];
  ydata: Array<number> | [];
  payYdata: Array<number> | [];
}

class Users extends React.Component<{}, IState> {
  componentDidMount() {
    this.clickMonth();
    // var myChart = echarts.init(document.getElementById('main'));
    // myChart.setOption(option);
  }
  state: IState = {
    spankey: 'month',
    xdata: [],
    ydata: [],
    payYdata: [],
  };
  initCharts = () => {
    var myChart = echarts.init(document.getElementById('main'));
    var myChart1 = echarts.init(document.getElementById('main1'));
    const option = {
      tooltip: {},
      xAxis: {
        type: 'category',
        data: this.state.xdata,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.state.ydata,
          type: 'line',
        },
      ],
    };
    const option1 = {
      tooltip: {},
      xAxis: {
        type: 'category',
        data: this.state.xdata,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.state.payYdata,
          type: 'line',
        },
      ],
    };
    myChart.setOption(option);
    myChart1.setOption(option1);
  };
  changeData = (date: any, dateString: [string, string]) => {
    console.log(date, dateString);
  };
  clickDate = () => {
    this.setState({
      spankey: 'date',
    });
    console.log('date');
  };
  clickMonth = () => {
    this.setState(
      {
        spankey: 'month',
        xdata: ['1号', '2号', '3号', '4号', '5号'],
        ydata: [1, 2, 3, 4, 55],
        payYdata: [1, 2, 3, 4, 55],
      },
      () => {
        return this.initCharts();
      },
    );
    console.log('month');
  };
  clickWeek = () => {
    this.setState(
      {
        spankey: 'week',
        xdata: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
        ydata: [1, 2, 3, 4, 55, 88, 77],
        payYdata: [1, 2, 3, 4, 55, 55, 67],
      },
      () => {
        return this.initCharts();
      },
    );
    console.log('week');
  };
  render() {
    return (
      <div>
        <PageHeaderWrapper>
          <DefinedDatePicker changeData={this.changeData}></DefinedDatePicker>
        </PageHeaderWrapper>
        <div className={styles.wrap}>
          <div className={styles.row}>
            <div className={styles.col}>
              <div>注册用户数</div>
              <div></div>
            </div>
            <div className={styles.col}>
              <div>付费用户数</div>
              <div></div>
            </div>
            <div className={styles.col}>
              <div>当前在线活跃用户数</div>
              <div></div>
            </div>
            <div className={styles.col}>
              <div>一月未登录用户数</div>
              <div></div>
            </div>
          </div>
          <TabCharts
            spankey={this.state.spankey}
            clickDate={this.clickDate}
            clickWeek={this.clickWeek}
            clickMonth={this.clickMonth}
          ></TabCharts>
        </div>
      </div>
    );
  }
}
export default Users;
