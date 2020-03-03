import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less';
import StatusSelect from './components/StatusSelect';
import OrderTable, { ITableColumn } from './components/OrderTable';
import ClassDetailsModal from './components/ClassDetailsModal';
import DefinedPagination from '@/components/pagination';
import OrderAPI from './service';
interface IState {
  loading: boolean;
  tableList: Array<ITableColumn> | [];
  curPage: number;
  totalItems: number;
  visible: boolean;
}
class OrderManage extends React.Component<{}, IState> {
  state: IState = {
    loading: false,
    tableList: [],
    curPage: 1,
    totalItems: 0,
    visible: false,
  };
  componentDidMount() {
    this.getTableList();
  }
  getTableList = async () => {
    try {
      this.setState({
        loading: true,
      });
      const { result } = await OrderAPI.orderTable({ curPage: this.state.curPage });
      console.log(result);
      this.setState({
        tableList: result.data,
        totalItems: result.total,
        loading: false,
      });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  };
  firstHandleChange = (value: string) => {};
  secondHandleChange = (value: string) => {};
  searchValue = (value: string) => {};
  changePage = (pageNumber: number) => {};
  changeSize = (current: number, size: number) => {};
  classDetails = (record: ITableColumn) => {
    console.log(record);
    this.setState({
      visible: true,
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <div>
        <PageHeaderWrapper></PageHeaderWrapper>
        <div className={styles.box}>
          <StatusSelect
            firstHandleChange={this.firstHandleChange}
            secondHandleChange={this.secondHandleChange}
            searchValue={this.searchValue}
          ></StatusSelect>
          <OrderTable
            loading={this.state.loading}
            list={this.state.tableList}
            classDetails={this.classDetails}
          ></OrderTable>
          <DefinedPagination
            curPage={this.state.curPage}
            totalItems={this.state.totalItems}
            changePage={this.changePage}
            changeSize={this.changeSize}
          ></DefinedPagination>
          <ClassDetailsModal
            visible={this.state.visible}
            handleCancel={this.handleCancel}
          ></ClassDetailsModal>
        </div>
      </div>
    );
  }
}
export default OrderManage;
