import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Row, Col, Tabs, Button } from 'antd';
import TabTable, { ITableColumn } from './component/TabTable';
import DefinedPagination from '@/components/pagination';
import storageAPI from '@/services/statistics/storage';
const { TabPane } = Tabs;
const operations = <Button>导出</Button>;
import styles from './index.less';
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title')
require('echarts/lib/component/legend');
interface Istate {
  serverName: string;
  key: string;
  curPage: number;
  list: ITableColumn[] | [];
  space: {
    totalSpace: string;
    usedSpace: string;
    leftSpace: string;
  };
  loading: boolean;
  chartsData:
    | {
        value: number;
        name: string;
      }[]
    | [];
  totalItems: number;
}
let chartData:
  | {
      value: number;
      name: string;
    }[]
  | [] = [];
class Storage extends React.Component<{}, Istate> {
  state: Istate = {
    serverName: '全部服务器',
    key: '1',
    curPage: 1,
    list: [],
    space: {
      totalSpace: '',
      usedSpace: '',
      leftSpace: '',
    },
    loading: false,
    chartsData: [],
    totalItems: 0,
  };
  componentDidMount() {
    this.getTableList({
      curPage: this.state.curPage,
      key: this.state.key,
    });
  }
  //生成图表
  initCharts = () => {
    const { chartsData } = this.state;
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '资源使用情况',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: chartsData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    });
  };
  //获取图表数据
  getChartsData = async () => {
    const { result } = await storageAPI.chartsData();
    chartData = result.chartsData;
    console.log(chartData);
  };
  //获取表格数据和图表数据
  getTableList = async (params: { curPage: number; key: string }) => {
    try {
      this.setState(
        {
          chartsData: [],
          list: [],
          loading: true,
        },
        () => {
          this.initCharts();
        },
      );
      const { result } = await storageAPI.tableList(params);
      await this.getChartsData();
      // console.log(result);
      this.setState(
        {
          chartsData: chartData,
          list: result.tableList.data,
          totalItems: result.tableList.total,
          loading: false,
        },
        () => {
          this.initCharts();
        },
      );
    } catch {
      this.setState({
        loading: false,
      });
    }
  };
  changeServer = (activeKey: string) => {
    if (activeKey === '2') {
      this.setState({
        serverName: '服务器一',
      });
    }
    if (activeKey === '3') {
      this.setState({
        serverName: '服务器二',
      });
    }
    if (activeKey === '4') {
      this.setState({
        serverName: '服务器三',
      });
    }
    this.setState(
      {
        key: activeKey,
      },
      () => {
        this.getTableList({
          curPage: this.state.curPage,
          key: this.state.key,
        });
      },
    );
    console.log(activeKey);
  };
  changePage = (pageNumber: number) => {
    console.log(pageNumber);
  };
  changeSize = (current: number, size: number) => {
    console.log(current, size);
  };
  render() {
    return (
      <div>
        <PageHeaderWrapper className={styles.main} />
        <Row type="flex" justify="space-between" className={styles.row}>
          <Col span={12} className={styles.col}>
            <Tabs tabBarExtraContent={operations} onChange={this.changeServer}>
              <TabPane tab="全部服务器" key="1" forceRender={true}>
                <TabTable
                  loading={this.state.loading}
                  space1="100G"
                  space2="79G"
                  list={this.state.list}
                  space={this.state.space}
                ></TabTable>
                <DefinedPagination
                  curPage={this.state.curPage}
                  totalItems={this.state.totalItems}
                  changePage={this.changePage}
                  changeSize={this.changeSize}
                ></DefinedPagination>
              </TabPane>
              <TabPane tab="服务器1" key="2" forceRender={true}>
                <TabTable
                  loading={this.state.loading}
                  space1="100G"
                  space2="79G"
                  list={this.state.list}
                  space={this.state.space}
                ></TabTable>
                <DefinedPagination
                  curPage={this.state.curPage}
                  totalItems={this.state.totalItems}
                  changePage={this.changePage}
                  changeSize={this.changeSize}
                ></DefinedPagination>
              </TabPane>
              <TabPane tab="服务器2" key="3" forceRender={true}>
                <TabTable
                  loading={this.state.loading}
                  space1="100G"
                  space2="79G"
                  list={this.state.list}
                  space={this.state.space}
                ></TabTable>
                <DefinedPagination
                  curPage={this.state.curPage}
                  totalItems={this.state.totalItems}
                  changePage={this.changePage}
                  changeSize={this.changeSize}
                ></DefinedPagination>
              </TabPane>
              <TabPane tab="服务器3" key="4" forceRender={true}>
                <TabTable
                  loading={this.state.loading}
                  space1="100G"
                  space2="79G"
                  list={this.state.list}
                  space={this.state.space}
                ></TabTable>
                <DefinedPagination
                  curPage={this.state.curPage}
                  totalItems={this.state.totalItems}
                  changePage={this.changePage}
                  changeSize={this.changeSize}
                ></DefinedPagination>
              </TabPane>
            </Tabs>
          </Col>
          <Col span={10} className={styles.col}>
            <div className={styles.serverName}>{this.state.serverName}</div>
            <div id="main" className={styles.colInner}></div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Storage;
