import React from 'react';
import { Row, Col, Pagination } from 'antd';

import TableBasic, { ITableColumn } from './TableBasic';
import SearchBox from '@/components/SearchBox';
import saleApi from '../../service';

import styles from './index.less';

interface IState {
  loading: boolean;
  total: number;
  list: Array<ITableColumn>;
  joinAmount: number;
  listQuery: {
    keywords: string;
    curPage: number;
    pageSize: number;
  };
}

interface IProps {
  courseNumber: string;
}

class Registration extends React.Component<IProps, IState> {
  state: IState = {
    loading: false,
    list: [],
    joinAmount: 0,
    total: 0,
    listQuery: {
      keywords: '',
      curPage: 0,
      pageSize: 0,
    },
  };

  componentDidMount() {
    this.fetchList({});
  }

  handleSearch = (v: string) => {
    this.fetchList({
      keywords: v,
    });
  };

  // 页码
  handleChangePageNumber = (curPage: number) => {
    // 获取page信息，并设置默认值
    this.fetchList({
      curPage,
    });
  };

  // 页尺寸
  handleChangePageSize = (curPage: number, pageSize: number) => {
    this.fetchList({
      curPage,
      pageSize,
    });
  };

  fetchList = async ({
    curPage = this.state.listQuery.curPage,
    pageSize = this.state.listQuery.pageSize,
    keywords = this.state.listQuery.keywords,
  }) => {
    try {
      this.setState({
        loading: true,
      });

      const {
        result: { data, total = this.state.total },
      } = await saleApi.joinList({
        page: {
          pageNumbers: curPage,
          countPerPages: pageSize,
        },
        data: {
          keywords,
          courseNumber: this.props.courseNumber,
        },
      });
      this.setState({
        total,
        list: data,
        loading: false,
        listQuery: {
          pageSize,
          curPage,
          keywords,
        },
      });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const {
      list,
      loading,
      total,
      listQuery: { curPage },
    } = this.state;
    return (
      <div>
        <h3 className={styles.title}>报名信息</h3>
        <Row type="flex" justify="space-between" align="middle">
          <Col>报名人数：{this.state.joinAmount}</Col>
          <Col>
            <SearchBox placeholder="请输入信息搜索" handleSearch={this.handleSearch}></SearchBox>
          </Col>
        </Row>
        <TableBasic loading={loading} list={list} className={styles.table}></TableBasic>

        <Pagination
          defaultCurrent={1}
          total={total}
          current={curPage}
          onChange={this.handleChangePageNumber}
          onShowSizeChange={this.handleChangePageSize}
          showSizeChanger
          showQuickJumper
        ></Pagination>
      </div>
    );
  }
}

export default Registration;
