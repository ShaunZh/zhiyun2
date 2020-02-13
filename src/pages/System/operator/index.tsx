import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { Select, Button, Input, Row, Col, Pagination } from 'antd';
import styles from './index.less';
import TableBasic, { ITableColumn } from './components/TableBasic';
import operator, { IOperator } from '@/services/system/operator';
import { getTableRowIndex } from '@/utils/utils';
import FormFormInModal, { OperateType } from './components/FormInModal';

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
  form: {
    number: string | undefined;
    operateType: OperateType;
    visible: boolean; // 新增操作员和编辑操作员表单
  };
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
    form: {
      number: undefined,
      // 默认操作类型为新增
      operateType: OperateType.CREATE,
      visible: false,
    },
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
    this.fetchList({
      status,
      curPage: 1,
    });
  };

  // 新增
  handleCreate = () => {
    this.setState({
      form: {
        number: undefined,
        visible: true,
        operateType: OperateType.CREATE,
      },
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

  // 编辑
  handleActionEdit = (index: number) => {
    const { key: number } = this.state.list[index];
    this.setState({
      form: {
        number,
        visible: true,
        operateType: OperateType.EDIT,
      },
    });
  };

  // 删除
  handleActionDelete = (index: number) => {
    console.log('delete index: ', index);
  };

  // 发送
  handleActionSend = (index: number) => {
    console.log('send index: ', index);
  };

  // 提交表单成功后需要刷新表格数据
  handleFormResult = (type: string) => {
    if (type === 'success') {
      this.fetchList({
        curPage: 1,
      });
    }
    this.setState((state: IState) => ({
      ...state,
      form: {
        ...state.form,
        visible: false,
      },
    }));
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
              style={{
                width: 240,
                height: 34,
                marginRight: 20,
                marginLeft: 10,
              }}
              onChange={this.handleChangeStatus}
            >
              {this.state.statusOptions.map(item => (
                <Option value={item.value} key={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
            <Button type="primary" onClick={this.handleCreate}>
              新增操作员
            </Button>
          </Col>
          <Col className="right">
            <Search
              placeholder="输入搜索内容"
              loading={searchLoading}
              onSearch={this.handleSearch}
              style={{
                width: 200,
              }}
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
        <FormFormInModal
          handleResult={this.handleFormResult}
          {...this.state.form}
        ></FormFormInModal>
      </PageHeaderWrapper>
    );
  }
}

export default Operator;
