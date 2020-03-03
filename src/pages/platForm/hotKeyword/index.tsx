import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, message, Spin } from 'antd';
import LeftList from './components/LeftList';
import RightTable, { ITableColumn } from './components/RightTable';
import styles from './index.less';
import keywordsAPI from './service';
import DefinedModal from './components/DefinedModal';
interface IState {
  listData: Array<string> | [];
  tableList: Array<ITableColumn> | [];
  visible: boolean;
  AddorEdit: string;
  inputValue: string;
  flagValue: string;
  spinning: boolean;
}
class HotKeyword extends React.Component<{}, IState> {
  state: IState = {
    listData: [],
    tableList: [],
    AddorEdit: '',
    visible: false,
    inputValue: '',
    flagValue: '',
    spinning: true,
  };
  componentDidMount() {
    this.getLeftList();
    this.getRightTable();
  }
  getLeftList = async () => {
    this.setState({
      spinning: true,
    });
    const { result } = await keywordsAPI.leftlist();
    this.setState({
      listData: result,
      spinning: false,
    });
  };
  getRightTable = async () => {
    this.setState({
      spinning: true,
    });
    const { result } = await keywordsAPI.righttable();
    this.setState({
      tableList: result.data,
      spinning: false,
    });
  };
  addKeyword = () => {
    this.setState({
      AddorEdit: 'add',
      visible: true,
    });
  };
  editKeyword = (item: string) => {
    this.setState({
      AddorEdit: 'edit',
      visible: true,
      inputValue: item,
      flagValue: item,
    });
    console.log(item);
  };
  handleOk = () => {
    if (this.state.inputValue.length === 0) {
      message.warn('内容不能为空');
      return;
    }
    if (this.state.flagValue.length > 0) {
      const value1: string = this.state.flagValue;
      const index = this.state.listData.indexOf(value1);
      this.state.listData[index] = this.state.inputValue;
      this.setState({
        visible: false,
        flagValue: '',
        inputValue: '',
      });
    } else {
      const value2: string = this.state.inputValue;
      this.state.listData.push(value2);
      this.setState({
        visible: false,
        inputValue: '',
      });
    }
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: event.target.value,
    });
  };
  deleteKeyword = (itemValue: string) => {
    const newListData = this.state.listData.filter(item => {
      if (item === itemValue) {
        return;
      }
      return item;
    });
    this.setState({
      listData: newListData,
    });
  };
  render() {
    return (
      <div className={styles.outerBox}>
        <Spin size="large" spinning={this.state.spinning} className={styles.spin} />
        <PageHeaderWrapper></PageHeaderWrapper>
        <div className={styles.button}>
          <Button type="primary" onClick={this.addKeyword}>
            新增关键词
          </Button>
        </div>
        <div className={styles.box}>
          <div className={styles.wrap}>
            <LeftList
              data={this.state.listData}
              editKeyword={this.editKeyword}
              deleteKeyword={this.deleteKeyword}
            ></LeftList>
          </div>
          <div className={styles.wrap}>
            <RightTable list={this.state.tableList}></RightTable>
          </div>
        </div>
        <DefinedModal
          AddorEdit={this.state.AddorEdit}
          visible={this.state.visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          inputValue={this.state.inputValue}
          inputChange={this.inputChange}
        ></DefinedModal>
      </div>
    );
  }
}
export default HotKeyword;
