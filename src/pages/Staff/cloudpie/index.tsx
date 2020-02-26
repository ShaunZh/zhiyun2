import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Row, Col } from 'antd';
import styles from './index.less';
import { router } from 'umi';
import cloudAPI from '@/services/staff/cloudpie';
import CloudTable, { ITableColumn } from './components/CloudTable';
import DefinedPagination from '@/components/pagination';
import SelectSearch from '@/components/statusSelect';
interface IState {
  option: { label: string; value: string }[];
  totalItems: number;
  curPage: number;
  ID: number;
  loading: boolean;
  tableList: Array<ITableColumn> | [];
}
interface IProps {
  history: any;
}
class Cloudpie extends React.Component<IProps, IState> {
  state: IState = {
    option: [{ label: '', value: '' }],
    totalItems: 0,
    curPage: 1,
    ID: 0,
    tableList: [],
    loading: false,
  };
  componentDidMount() {
    console.log(this.props.history.location.query.id);
    this.setState(
      {
        ID: this.props.history.location.query.id,
      },
      () => {
        this.getTableList();
      },
    );
  }
  back = () => {
    router.go(-1);
  };
  getTableList = async () => {
    try {
      this.setState({
        loading: true,
      });
      const { result } = await cloudAPI.cloudinfo(this.state.ID);
      console.log(result);
      this.setState({
        loading: false,
        tableList: result.tableList.data,
        totalItems: result.tableList.total,
      });
    } catch {
      this.setState({
        loading: false,
      });
    }
  };
  changePage = (pageNumber: number) => {};
  changeSize = (current: number, size: number) => {};
  forbid = (No: number) => {};
  delete = (No: number) => {};
  handleChangeStatus = (value: string) => {};
  inputSearch = (value: string) => {};
  render() {
    return (
      <div className={styles.box}>
        <PageHeaderWrapper></PageHeaderWrapper>
        <Button className={styles.back} onClick={this.back}>
          返回上一级页面
        </Button>
        <div className={styles.box2}>
          <SelectSearch
            options={this.state.option}
            handleChangeStatus={this.handleChangeStatus}
            inputSearch={this.inputSearch}
          ></SelectSearch>
          <Row className={styles.row}>
            <Col span={6}>总空间 ： </Col>
            <Col span={6}>剩余空间 ： </Col>
          </Row>
          <CloudTable
            loading={this.state.loading}
            tableList={this.state.tableList}
            forbid={this.forbid}
            delete={this.delete}
          ></CloudTable>
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
export default Cloudpie;
