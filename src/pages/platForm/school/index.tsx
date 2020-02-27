import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SelectSearch from '@/components/statusSelect';
import styles from './index.less';
import SchoolTable, { ITableColumn } from './components/Table';
import DefinedPagination from '@/components/pagination';
import schoolAPI from '@/services/platform/school';
interface IState {
  totalItems: number;
  curPage: number;
  option: { label: string; value: string }[] | [];
  loading: boolean;
  schoolList: Array<ITableColumn> | [];
}
class SchoolManage extends React.Component<{}, IState> {
  state: IState = {
    totalItems: 1,
    curPage: 1,
    option: [],
    loading: false,
    schoolList: [],
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
  };
  lookCustomerService = (record: ITableColumn) => {};
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
      </div>
    );
  }
}
export default SchoolManage;
