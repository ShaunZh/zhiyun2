import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SelectSearch from '@/components/statusSelect';
import styles from './index.less';
import SchoolTable, { ITableColumn } from './components/Table';
import DefinedPagination from '@/components/pagination';
import schoolAPI from '@/services/platform/school';
import CustomerServiceModal, { ITableColumn1 } from './components/customerServiceModal';
interface IState {
  totalItems: number;
  curPage: number;
  option: { label: string; value: string }[] | [];
  loading: boolean;
  schoolList: Array<ITableColumn> | [];
  modalVisible: boolean;
  customerServiceList: Array<ITableColumn1> | [];
  customerServiceNumber: number;
  modalCurpage: number;
  modalTotalItems: number;
  loading2:boolean;
}
class SchoolManage extends React.Component<{}, IState> {
  state: IState = {
    totalItems: 1,
    curPage: 1,
    option: [],
    loading: false,
    schoolList: [],
    modalVisible: false,
    customerServiceList: [],
    customerServiceNumber: 0,
    modalCurpage: 1,
    modalTotalItems: 0,
    loading2:false
  };
  componentDidMount() {
    this.getTableList();
  }
  getTableList = async () => {
    try {
      this.setState({
        loading: true,
      });
      const { result } = await schoolAPI.schoolList({ curPage: this.state.curPage });
      console.log(result);
      this.setState({
        totalItems: result.tableList.total,
        schoolList: result.tableList.data,
        loading: false,
      });
    } catch {
      this.setState({
        loading: false,
      });
    }
    const { result } = await schoolAPI.schoolList({ curPage: this.state.curPage });
    console.log(result);
    this.setState({
      totalItems: result.tableList.total,
      schoolList: result.tableList.data,
    });
  };
  handleChangeStatus = (value: string) => {};
  inputSearch = (value: string) => {};
  changePage = (pageNumber: number) => {};
  changeSize = (current: number, size: number) => {};
  changeSchoolStatus = (record: ITableColumn) => {
    console.log(record.No);
    const newSchoolList = this.state.schoolList.filter(item => {
      if (item.No === record.No) {
        if (record.status === '已禁用') {
          item.status = '已启用';
        } else {
          item.status = '已禁用';
        }
      }
      return item;
    });
    console.log(newSchoolList);
    this.setState({
      schoolList: newSchoolList,
    });
  };
  lookCustomerService = async (record: ITableColumn) => {
    this.setState({
      modalVisible: true,
      loading2:true
    });
    const { result } = await schoolAPI.customerServiceList({
      schoolAccount: record.account,
    });
    console.log(result);
    this.setState({
      loading2:false,
      customerServiceList: result.tableList.data,
      modalTotalItems: result.tableList.total,
      customerServiceNumber: result.tableList.total,
    });
  };
  modalHandleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };
  modalChangepage = (pageNumber: number) => {};
  modalChangesize = (current: number, size: number) => {};
  render() {
    return (
      <div>
        <PageHeaderWrapper></PageHeaderWrapper>
        <div className={styles.btBox}>
          <SelectSearch
            options={this.state.option}
            handleChangeStatus={this.handleChangeStatus}
            inputSearch={this.inputSearch}
          ></SelectSearch>
          <SchoolTable
            loading={this.state.loading}
            list={this.state.schoolList}
            changeSchoolStatus={this.changeSchoolStatus}
            lookCustomerService={this.lookCustomerService}
          ></SchoolTable>
          <DefinedPagination
            curPage={this.state.curPage}
            totalItems={this.state.totalItems}
            changePage={this.changePage}
            changeSize={this.changeSize}
          ></DefinedPagination>
        </div>
        <CustomerServiceModal
          loading={this.state.loading2}
          customerServiceNumber={this.state.customerServiceNumber}
          modalVisible={this.state.modalVisible}
          modalHandleCancel={this.modalHandleCancel}
          list={this.state.customerServiceList}
          curPage={this.state.modalCurpage}
          totalItems={this.state.modalTotalItems}
          changePage={this.modalChangepage}
          changeSize={this.modalChangesize}
        ></CustomerServiceModal>
      </div>
    );
  }
}
export default SchoolManage;
