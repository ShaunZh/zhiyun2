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
    this.fetchList();
  }

  fetchStatusOptions = async () => {
    const { result } = await operator.statusOptions();
    this.setState({
      statusOptions: result,
    });
  };

  fetchList = async () => {
    try {
      await this.setState({
        loading: true,
      });
      const { page, data } = await operator.list({
        pageSize: this.state.pageSize,
        curPage: this.state.curPage,
        keywords: this.state.keywords,
        status: this.state.status,
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
      });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  };

  // 选择状态
  handleChangeStatus = (e: string) => {
    // TODO 因为fetchList中需要使用status，curPage等信息，因此，此处在setState中添加了回调函数，
    // 等待state更新后再执行fetchList，这种操作方式是否破坏了react中对state更新的优化？在react中，
    // setState 是异步的，也就是react会收集一组setState，然后进行一次更新，不会在setState时立马更新
    this.setState(
      {
        status: e,
        curPage: 1,
      },
      () => {
        this.fetchList();
      },
    );
  };

  handleSearch = (value: string) => {
    this.setState(
      {
        keywords: value,
      },
      () => {
        this.fetchList();
      },
    );
  };

  handleChangePageNumber = (page: number) => {
    // 获取page信息，并设置默认值
    this.setState(
      {
        curPage: page,
      },
      () => {
        this.fetchList();
      },
    );
  };

  handleChangePageSize = (current: number, size: number) => {
    this.setState(
      {
        curPage: current,
        pageSize: size,
      },
      () => {
        this.fetchList();
      },
    );
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
