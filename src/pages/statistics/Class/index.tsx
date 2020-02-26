import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Row, Col, Button } from 'antd';
import styles from './index.less';
import ClassTable, { ITableColumn } from './components/ClassTable';
import classAPI from '@/services/statistics/class';
import DefinedPagination from '@/components/pagination';
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
interface IState {
  loading: boolean;
  classList: Array<ITableColumn> | [];
  curPage: number;
  classData:
    | {
        name: string;
        value: number;
      }[]
    | [];
  classCategory: Array<string>;
}
class Classes extends React.Component<{}, IState> {
  state: IState = {
    loading: false,
    classList: [],
    curPage: 1,
    classData: [],
    classCategory: [''],
  };
  componentDidMount() {
    this.getClassCategory();
  }
  getClassCategory = async () => {
    try {
      this.setState({
        loading: true,
      });
      const { result } = await classAPI.classCategory();
      const classCate = result.classCategory.map((item: ITableColumn) => {
        return item.category;
      });
      const chartData = result.classCategory.map((item: ITableColumn) => {
        return {
          name: item.category,
          value: item.amount,
        };
      });
      console.log(result);
      console.log(chartData);
      this.setState(
        {
          // curPage:1,
          classList: result.classCategory,
          loading: false,
          classData: chartData,
          classCategory: classCate,
        },
        () => {
          this.initChart();
        },
      );
    } catch {
      this.setState({
        loading: false,
      });
    }
  };
  changePage = (pageNumber: number) => {
    console.log(pageNumber);
  };
  changeSize = (current: number, size: number) => {
    console.log(current, size);
  };

  initChart = () => {
    var myChart = echarts.init(document.getElementById('main'));
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 10,
        data: this.state.classCategory,
      },
      series: [
        {
          name: '课程数统计',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: this.state.classData,
        },
      ],
    };
    myChart.setOption(option);
  };
  render() {
    return (
      <div>
        <PageHeaderWrapper></PageHeaderWrapper>
        <Row type="flex" justify="space-between" className={styles.row}>
          <Col span={11} className={styles.col}>
            <div className={styles.wrap}>
              <span className={styles.left}>课程总数:</span>
              <Button className={styles.right}>导出</Button>
            </div>
            <ClassTable classList={this.state.classList} loading={this.state.loading}></ClassTable>
            <DefinedPagination
              curPage={this.state.curPage}
              totalItems={this.state.classList.length}
              changePage={this.changePage}
              changeSize={this.changeSize}
            ></DefinedPagination>
          </Col>
          <Col span={11} className={styles.col}>
            <div className={styles.wrap}>
              <span className={styles.left}>课程数统计</span>
              <Button className={styles.right}>下载</Button>
            </div>
            <div id="main" className={styles.chart}></div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Classes;
