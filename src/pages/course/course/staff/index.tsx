import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Row, Col, Pagination } from 'antd';

import styles from './styles.less';

import SearchBox from '@/components/SearchBox';
import Radios from './components/Radios';
import TableBasic, { ITableColumn, EStaffType } from './components/TableBasic';

import serviceApi, { IStaff } from './service';
import { getTableRowIndex } from '@/utils/utils';

interface IRadioOption extends ISelectOption {
  name: EStaffType;
}

interface IState {
  courseName: string;
  loading: boolean;
  radiosList: Array<IRadioOption>;
  total: number;
  staffType: EStaffType; // 选择的人员类型
  listQuery: {
    pageSize: number;
    curPage: number;
    type: string;
    keywords: string;
  };
  list: Array<ITableColumn>;
}

interface IFetchList {
  pageSize?: number;
  curPage?: number;
  keywords?: string;
  type?: string;
}

class Resources extends React.Component<{}, IState> {
  state: IState = {
    courseName: '课程名称',
    loading: false,
    listQuery: {
      pageSize: 10,
      curPage: 1,
      type: '1',
      keywords: '',
    },
    staffType: EStaffType.masterAdmin,
    list: [],
    total: 0,
    radiosList: [
      {
        label: '总管理员',
        value: '1',
        name: EStaffType.masterAdmin,
      },
      {
        label: '管理员',
        value: '2',
        name: EStaffType.admin,
      },
      {
        label: '教师',
        value: '3',
        name: EStaffType.teacher,
      },
      {
        label: '会员',
        value: '4',
        name: EStaffType.member,
      },
    ],
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
        pageSize = this.state.listQuery.pageSize,
        curPage = this.state.listQuery.curPage,
        keywords = this.state.listQuery.keywords,
        type = this.state.listQuery.type,
      } = queryParams;
      const {
        result: { page, data },
      } = await serviceApi.list({
        pageSize,
        curPage,
        keywords,
        type,
      });
      const list = data.map((item: IStaff, index: number) => {
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
          type,
        },
      });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  };

  handleChangeType = (value: string) => {
    const index = this.state.radiosList.findIndex(item => item.value === value);
    const { radiosList } = this.state;
    this.setState({
      staffType: radiosList[index].name,
    });
    this.fetchList({
      type: value,
      curPage: 1,
    });
  };

  // 搜索
  handleSearch = (keywords: string) => {
    this.fetchList({
      keywords,
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

  render() {
    const {
      loading,
      list,
      total,
      listQuery: { curPage },
    } = this.state;
    return (
      <PageHeaderWrapper className={styles.main}>
        <Row className="header" type="flex">
          <Col className="left" span={20}>
            <Radios
              radiosList={this.state.radiosList}
              handleChange={this.handleChangeType}
              defaultValue={this.state.listQuery.type}
            ></Radios>
          </Col>
          <Col className="right" span={4}>
            <SearchBox placeholder="请输入搜索内容" handleSearch={this.handleSearch}></SearchBox>
          </Col>
        </Row>
        <p className={styles.title}>{this.state.courseName}</p>
        <TableBasic loading={loading} list={list} type={this.state.staffType} />
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

export default Resources;
