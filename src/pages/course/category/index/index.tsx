import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { Button, Row, Col, Pagination, Modal, message } from 'antd';
import styles from './index.less';
import TableBasic, { ITableColumn } from './components/TableBasic';
import SearchBox from '@/components/SearchBox';
import categoryApi from './service';
import FormFormInModal, { OperateType } from './components/FormInModal';

interface IState {
  loading: boolean;
  list: Array<ITableColumn>;
  total: number;
  searchLoading: boolean;
  form: {
    number: string | undefined;
    operateType: OperateType;
    visible: boolean; // 新增操作员和编辑操作员表单
  };
  listQuery: {
    curPage: number;
    pageSize: number;
    keywords: string;
  };
}

const { confirm } = Modal;

class Category extends React.Component<{}, IState> {
  state: IState = {
    loading: false,
    list: [],
    total: 0,
    searchLoading: false,
    form: {
      number: undefined,
      // 默认操作类型为新增
      operateType: OperateType.create,
      visible: false,
    },
    listQuery: {
      curPage: 1,
      pageSize: 10,
      keywords: '',
    },
  };

  componentDidMount() {
    this.fetchList({});
  }

  fetchList = async ({
    pageSize = this.state.listQuery.pageSize,
    curPage = this.state.listQuery.curPage,
    keywords = this.state.listQuery.keywords,
  }) => {
    try {
      this.setState({
        loading: true,
      });
      const {
        result: { data, total = this.state.total },
      } = await categoryApi.list({
        page: {
          pageNumbers: curPage,
          countPerPages: pageSize,
        },
        data: {
          keywords,
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

  // 新增
  handleCreate = () => {
    this.setState({
      form: {
        number: undefined,
        visible: true,
        operateType: OperateType.create,
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
    const { number } = this.state.list[index];
    this.setState({
      form: {
        number,
        visible: true,
        operateType: OperateType.edit,
      },
    });
  };

  // 删除
  handleActionDelete = (index: number) => {
    const { key: number } = this.state.list[index];
    confirm({
      title: '确认删除',
      onOk: async () => {
        await categoryApi.remove({ number });
        message.success('删除成功');
        this.fetchList({});
      },
      onCancel() {},
    });
  };

  // 提交表单成功后需要刷新表格数据
  handleFormResult = (type: string) => {
    if (type === 'success') {
      this.fetchList({});
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
    const {
      loading,
      list,
      total,
      listQuery: { curPage },
    } = this.state;
    return (
      <PageHeaderWrapper className={styles.main}>
        <Row className="header" type="flex" align="middle" justify="space-between">
          <Col className="left">
            <Button type="primary" onClick={this.handleCreate}>
              新增分类
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

export default Category;
