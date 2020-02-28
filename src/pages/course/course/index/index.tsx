import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { Row, Col, Pagination } from 'antd';
import styles from './index.less';
import TableBasic, { ITableColumn } from './components/TableBasic';

// 筛选项
import StatusSelect from './components/StatusSelect';
import CategorySelect from './components/CategorySelect';
import SchoolSelect from './components/SchoolSelect';
import UpSelect from './components/UpSelect';
import SearchBox from '@/components/SearchBox';
// --- end

import courseApi, { ICourse } from '@/services/course/course';
import { getTableRowIndex } from '@/utils/utils';

interface IState {
  loading: boolean;
  list: Array<ITableColumn>;
  total: number;
  curPage: number;
  pageSize: number;
  keywords: string;
  filter: {
    category: string;
    status: string;
    up: string;
    school: string;
  };
}
interface IFetchList {
  pageSize?: number;
  curPage?: number;
  keywords?: string;
  category?: string;
  status?: string;
  up?: string;
  school?: string;
}

// TODO: 当进入到子页面后，从子页面返回时到当前页面时，要保留当前的页码信息、筛选信息和搜索信息，
class Course extends React.Component<{}, IState> {
  state: IState = {
    loading: false,
    list: [],
    curPage: 1,
    pageSize: 10,
    keywords: '',
    filter: {
      category: '',
      status: '',
      up: '',
      school: '',
    },
    total: 0,
  };

  componentDidMount() {
    this.fetchList({});
  }

  fetchList = async (queryParams: IFetchList) => {
    try {
      this.setState({
        loading: true,
      });
      const {
        pageSize = this.state.pageSize,
        curPage = this.state.curPage,
        keywords = this.state.keywords,
        status = this.state.filter.status,
        category = this.state.filter.category,
        up = this.state.filter.up,
        school = this.state.filter.school,
      } = queryParams;
      const {
        result: { page, data },
      } = await courseApi.list({
        pageSize,
        curPage,
        keywords,
        status,
        category,
        up,
        school,
      });
      const list = data.map((item: ICourse, index: number) => {
        const key = getTableRowIndex(pageSize, curPage, index);
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
        filter: {
          status,
          category,
          up,
          school,
        },
      });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  };

  // 选择状态
  handleChangeStatus = (status: string) => {
    this.fetchList({
      status,
      curPage: 1,
    });
  };

  handleChangeSchool = (school: string) => {
    this.fetchList({
      school,
      curPage: 1,
    });
  };

  handleChangeUp = (up: string) => {
    this.fetchList({
      up,
      curPage: 1,
    });
  };

  handleChangeCategory = (category: string) => {
    this.fetchList({
      category,
      curPage: 1,
    });
  };

  // 搜索
  handleSearch = (keywords: string) => {
    this.fetchList({
      keywords,
      curPage: 1,
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

  // 禁用/启用
  handleActionEnable = async (index: number) => {
    await courseApi.enable({ number: this.state.list[index].key });
    const { list } = this.state;
    list[index].status = list[index].status === 'Y' ? 'N' : 'Y';
    this.setState({
      list,
    });
  };

  render() {
    const { loading, list, total, curPage } = this.state;
    return (
      <PageHeaderWrapper className={styles.main}>
        <Row className="header" type="flex">
          <Col className="left" span={20}>
            <CategorySelect handleChange={this.handleChangeCategory}></CategorySelect>
            <StatusSelect handleChange={this.handleChangeStatus}></StatusSelect>
            <UpSelect handleChange={this.handleChangeUp}></UpSelect>
            <SchoolSelect handleChange={this.handleChangeSchool}></SchoolSelect>
          </Col>
          <Col className="right" span={4}>
            <SearchBox placeholder="请输入搜索内容" handleSearch={this.handleSearch}></SearchBox>
          </Col>
        </Row>

        <TableBasic loading={loading} list={list} handleActionEnable={this.handleActionEnable} />
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

export default Course;
