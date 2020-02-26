import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import styles from './index.less';
import { Button, Input, message, Modal } from 'antd';
import RoleTable, { ITableColumn } from './component/RoleTable';
import ModalForm from './component/Model';
import roleApi from '@/services/system/role';
import DefinedPagination from '@/components/pagination';
const { Search } = Input;
const { confirm } = Modal;
interface Istate {
  loading: boolean;
  modalVisible: boolean;
  tableList: Array<ITableColumn> | [];
  value: string[] | [];
  treeData:
    | {
        title: string;
        value: string;
        key: string;
        children?: {
          title: string;
          value: string;
          key: string;
        }[];
      }[]
    | [];
  inputValue: string;
  curPage: number;
  totalItems: number;
  currentObject: ITableColumn;
}
class Role extends React.Component<{}, Istate> {
  state: Istate = {
    loading: false,
    tableList: [],
    modalVisible: false,
    value: [],
    treeData: [],
    inputValue: '',
    curPage: 1,
    totalItems: 1,
    currentObject: {
      No: 0,
      role: '',
      time: '',
      rights: [''],
    },
  };
  componentDidMount() {
    this.getRoleList();
    this.getTreeData();
  }
  //获取角色权限树形数据
  getTreeData = async () => {
    const { result } = await roleApi.roleTreeData();
    this.setState({
      treeData: result.roleTreeData,
    });
    console.log(result);
  };
  //获取角色列表
  getRoleList = async () => {
    try {
      this.setState({
        loading: true,
      });
      const { result } = await roleApi.roleList(this.state.curPage);
      console.log(result);
      this.setState({
        totalItems: result.roleList.total,
        tableList: result.roleList.roleData,
        loading: false,
      });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  };
  //编辑角色权限
  handleActionEdit = (index: number, record: ITableColumn) => {
    console.log(index);
    console.log(this.state.tableList[index]);
    this.setState({
      modalVisible: true,
      inputValue: this.state.tableList[index].role,
      value: this.state.tableList[index].rights,
      currentObject: record,
    });
  };
  //删除角色
  handleActionDelete = (index: number) => {
    console.log(index);
  };
  createRole = () => {
    this.setState({
      modalVisible: true,
    });
  };
  //确认操作
  handleOk = () => {
    if (this.state.inputValue.length === 0) {
      message.error('角色名不能为空');
      return;
    }
    console.log(this.state.value);
    const event2 = () => {
      this.setState({
        modalVisible: false,
        value: [],
        inputValue: '',
      });
    };
    const event = () => {
      const newRoleData = this.state.tableList.filter((item: ITableColumn) => {
        if (item.No === this.state.currentObject.No) {
          item.role = this.state.inputValue;
        }
        return item;
      });
      this.setState({
        tableList: newRoleData,
      });
    };
    confirm({
      title: '确定继续该操作吗?',
      content: '',
      onOk() {
        //在此处应将编辑过的角色权限提交
        message.success('操作成功！');
        event();
        event2();
      },
      onCancel() {
        event2();
      },
    });
    // this.setState({
    //   modalVisible: false,
    //   value: [],
    //   inputValue: '',
    // });
  };
  //取消操作
  handleCancel = () => {
    console.log('cancel');
    this.setState({
      modalVisible: false,
      value: [],
      inputValue: '',
    });
  };
  //选择树形结构发生的事件
  selectNode = (value: string[]) => {
    console.log(value);
    this.setState({ value });
  };
  //输入管理员名字发生的事件
  changeInputValue = (e: any) => {
    console.log(e.target.value);
    this.setState({
      inputValue: e.target.value,
    });
  };
  changePage = (pageNumber: number) => {
    this.getRoleList();
    console.log(pageNumber);
  };
  changeSize = (current: number, size: number) => {
    console.log(current);
    console.log(size);
  };
  render() {
    return (
      <div>
        <PageHeaderWrapper>
          <div className={styles.searchbar}>
            <div>
              <Button type="primary" onClick={this.createRole}>
                新增角色
              </Button>
            </div>
            <div>
              <Search
                placeholder="请输入搜索内容"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
              />
            </div>
          </div>
          <RoleTable
            list={this.state.tableList}
            loading={this.state.loading}
            handleActionEdit={this.handleActionEdit}
            handleActionDelete={this.handleActionDelete}
          ></RoleTable>
          <ModalForm
            visible={this.state.modalVisible}
            handleOk={this.handleOk}
            handleCancel={this.handleCancel}
            treeData={this.state.treeData}
            value={this.state.value}
            selectNode={this.selectNode}
            changeInputValue={this.changeInputValue}
            inputValue={this.state.inputValue}
          ></ModalForm>
          <DefinedPagination
            curPage={this.state.curPage}
            totalItems={this.state.totalItems}
            changePage={this.changePage}
            changeSize={this.changeSize}
          ></DefinedPagination>
        </PageHeaderWrapper>
      </div>
    );
  }
}
export default Role;
