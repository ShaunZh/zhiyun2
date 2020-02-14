import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { Button, Row, Col, Pagination, Modal, message } from 'antd';
import styles from './index.less';
import TableBasic, { ITableColumn } from './components/TableBasic';
import StatusSelect from './components/StatusSelect';
import SearchBox from '@/components/SearchBox';
import operatorApi, { IOperator } from '@/services/system/operator';
import { getTableRowIndex } from '@/utils/utils';
import FormFormInModal, { OperateType } from './components/FormInModal';

interface IState {
  loading: boolean;
  list: Array<ITableColumn>;
  total: number;
  curPage: number;
  pageSize: number;
  keywords: string;
  searchLoading: boolean;
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
const { confirm } = Modal;

class Operator extends React.Component<{}, IState> {
  state: IState = {
    loading: false,
    list: [],
    curPage: 1,
    pageSize: 10,
    keywords: '',
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
        status = this.state.status,
      } = queryParams;
      const {
        result: { page, data },
      } = await operatorApi.list({
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
    const { key: number } = this.state.list[index];
    confirm({
      title: '确认删除',
      onOk: async () => {
        await operatorApi.remove({ number });
        message.success('删除成功');
        this.fetchList({});
      },
      onCancel() {},
    });
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
      message.success('保存成功');
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
    const { loading, list, total, curPage } = this.state;
    return (
      <PageHeaderWrapper className={styles.main}>
        <Row className="header" type="flex" align="middle" justify="space-between">
          <Col className="left">
            <StatusSelect handleChangeStatus={this.handleChangeStatus}></StatusSelect>
            <Button type="primary" onClick={this.handleCreate}>
              新增操作员
            </Button>
          </Col>
          <Col className="right">
            <SearchBox placeholder="请输入搜索内容" handleSearch={this.handleSearch}></SearchBox>
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
