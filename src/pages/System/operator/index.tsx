import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { Select, Button, Input, Row, Col, Pagination } from 'antd';
import styles from './index.less';
import TableBasic, { ITableColumn } from './components/TableBasic';
import operator, { IOperator } from '@/services/system/operator';
import { getTableRowIndex } from '@/utils/utils';

interface IStatusOptions {
  label: string;
  value: string;
}

interface IState {
  loading: boolean;
  list: Array<ITableColumn>;
  total: number;
  curPage: number;
  pageSize: number;
  keywords: string;
  searchLoading: boolean;
  statusOptions: Array<IStatusOptions>;
  status: string;
}

interface IFetchList {
  pageSize?: number;
  curPage?: number;
  keywords?: string;
  status?: string;
}

const { Option } = Select;
const { Search } = Input;

class Operator extends React.Component<{}, IState> {
  state: IState = {
    loading: false,
    list: [],
    curPage: 1,
    pageSize: 10,
    keywords: '',
    statusOptions: [],
    status: '',
    total: 0,
    searchLoading: false,
  };

  componentDidMount() {
    this.fetchStatusOptions();
    this.fetchList({});
  }

  fetchStatusOptions = async () => {
    const { result } = await operator.statusOptions();
    this.setState({
      statusOptions: result,
    });
  };

  fetchList = async (queryParams: IFetchList) => {
    try {
      this.setState({
        loading: true,
      });
      const {
        pageSize = this.state.pageSize,
        curPage = this.state.curPage,
        keywords = this.state.keywords,
        status = this.state.status,
      } = queryParams;
      const { page, data } = await operator.list({
        pageSize,
        curPage,
        keywords,
        status,
      });
      const list = data.map((item: IOperator, index: number) => {
        const key = getTableRowIndex(this.state.pageSize, this.state.curPage, index);
        return {
          No: key,
          key: item.number,
          ...item,
        };
      });
      this.setState({
        total: page.total,
        list,
        loading: false,
        pageSize,
        curPage,
        keywords,
        status,
      });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  };

  // 选择状态
  handleChangeStatus = (status: string) => {
    this.fetchList({ status, curPage: 1 });
  };

  handleSearch = (keywords: string) => {
    this.fetchList({ keywords, curPage: 1 });
  };

  handleChangePageNumber = (curPage: number) => {
    // 获取page信息，并设置默认值
    this.fetchList({ curPage });
  };

  handleChangePageSize = (curPage: number, pageSize: number) => {
    this.fetchList({ curPage, pageSize });
  };

  // 编辑
  handleActionEdit = (index: number) => {
    console.log('edit index: ', index);
  };

  // 删除
  handleActionDelete = (index: number) => {
    console.log('delete index: ', index);
  };

  // 发送
  handleActionSend = (index: number) => {
    console.log('send index: ', index);
  };

  render() {
    const { loading, list, total, curPage, searchLoading } = this.state;
    return (
      <PageHeaderWrapper className={styles.main}>
        <Row className="header" type="flex" align="middle" justify="space-between">
          <Col className="left">
            <span className="u-name">状态: </span>
            <Select
              placeholder="请选择状态"
              style={{ width: 240, height: 34, marginRight: 20, marginLeft: 10 }}
              onChange={this.handleChangeStatus}
            >
              {this.state.statusOptions.map(item => (
                <Option value={item.value} key={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
            <Button type="primary">新增操作员</Button>
          </Col>
          <Col className="right">
            <Search
              placeholder="输入搜索内容"
              loading={searchLoading}
              onSearch={this.handleSearch}
              style={{ width: 200 }}
            />
          </Col>
        </Row>
        <TableBasic
          loading={loading}
          list={list}
          handleActionEdit={this.handleActionEdit}
          handleActionDelete={this.handleActionDelete}
          handleActionSend={this.handleActionSend}
        />
        <Pagination
          defaultCurrent={1}
          total={total}
          current={curPage}
          onChange={this.handleChangePageNumber}
          onShowSizeChange={this.handleChangePageSize}
          showSizeChanger
          showQuickJumper
        ></Pagination>
      </PageHeaderWrapper>
    );
  }
}

export default Operator;
