import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { Row, Col, Pagination } from 'antd';
import styles from './index.less';
import TableBasic, { ITableColumn } from './components/TableBasic';

import { IListQueryParams } from './data.d';
import consts from './consts';

import SearchBox from '@/components/SearchBox';
import Select from '@/components/Select';

import courseApi, { ICourse } from '@/services/course/course';
import { getTableRowIndex } from '@/utils/utils';

interface IState {
  loading: boolean;
  list: Array<ITableColumn>;
  total: number;
  listQuery: IListQueryParams;
  filterOptions: {
    category: Array<ISelectOption>;
    school: Array<ISelectOption>;
    status: Array<ISelectOption>;
    up: Array<ISelectOption>;
  };
}

class Course extends React.Component<{}, IState> {
  state: IState = {
    loading: false,
    list: [],
    filterOptions: {
      category: [],
      school: [],
      status: [
        { label: '全部', value: '' },
        { label: '启用', value: 'Y' },
        { label: '禁用', value: 'N' },
      ],
      up: [
        { label: '全部', value: '' },
        { label: '是', value: 'Y' },
        { label: '否', value: 'N' },
      ],
    },
    listQuery: {
      curPage: 1,
      pageSize: 10,
      keywords: '',
      category: '',
      status: '',
      up: '',
      school: '',
    },
    total: 0,
  };

  async componentDidMount() {
    await this.fetchFilterOptions();
    // 1. 获取session中保存的页码和筛选条件
    const session = sessionStorage.getItem(consts.session.listQuery);
    if (session) {
      // 2. 将session信息传入fetchList中，并在fetchList中将信息恢复到state中
      await this.fetchList(JSON.parse(session));
      // 3. 清空session中的信息
      sessionStorage.removeItem(consts.session.listQuery);
    } else {
      this.fetchList({});
    }
  }

  fetchList = async ({
    pageSize = this.state.listQuery.pageSize,
    curPage = this.state.listQuery.curPage,
    keywords = this.state.listQuery.keywords,
    status = this.state.listQuery.status,
    category = this.state.listQuery.category,
    up = this.state.listQuery.up,
    school = this.state.listQuery.school,
  }) => {
    try {
      this.setState({
        loading: true,
      });

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
        listQuery: {
          pageSize,
          curPage,
          keywords,
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

  fetchFilterOptions = async () => {
    const { result: category } = await courseApi.categoriesList();
    const { result: school } = await courseApi.schoolsList();
    const { filterOptions } = this.state;
    category.unshift({ label: '全部', value: '' });
    school.unshift({ label: '全部', value: '' });
    this.setState({
      filterOptions: {
        ...filterOptions,
        category,
        school,
      },
    });
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
    const { loading, list, total, listQuery, filterOptions } = this.state;
    return (
      <PageHeaderWrapper className={styles.main}>
        <Row className="header" type="flex">
          <Col className="left" span={20}>
            <Select
              options={filterOptions.category}
              value={listQuery.category}
              label="课程分类:"
              placeholder="请选择课程分类"
              handleChange={this.handleChangeCategory}
            ></Select>

            <Select
              options={filterOptions.status}
              value={listQuery.status}
              label="课程状态:"
              placeholder="请选择课程状态"
              handleChange={this.handleChangeStatus}
            ></Select>
            <Select
              options={filterOptions.up}
              value={listQuery.up}
              label="是否上架到平台:"
              placeholder="请选择状态"
              handleChange={this.handleChangeUp}
            ></Select>
            <Select
              options={filterOptions.school}
              value={listQuery.school}
              label="所属网校:"
              placeholder="请选择所属网校"
              handleChange={this.handleChangeSchool}
            ></Select>
          </Col>
          <Col className="right" span={4}>
            <SearchBox
              value={listQuery.keywords}
              placeholder="请输入搜索内容"
              handleSearch={this.handleSearch}
            ></SearchBox>
          </Col>
        </Row>

        <TableBasic
          loading={loading}
          list={list}
          handleActionEnable={this.handleActionEnable}
          listQuery={listQuery}
        />
        <Pagination
          defaultCurrent={1}
          total={total}
          current={listQuery.curPage}
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
