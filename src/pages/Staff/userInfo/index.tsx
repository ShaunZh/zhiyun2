import React from 'react';
import SelectSearch from './components/SelectSearch';
import UserTable, { ITableColumn1 } from './components/UserTable';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DefinedPagination from '@/components/pagination';
import UserInfoModal, { userInfoType } from './components/UserInfoModal';
import ChatLogModal, { listType } from './components/ChatLogModal';
import DetailedLogModal from './components/DetailedLogModal';
import IdentityDetailModal, { ITableColumn } from './components/IdentityDetailModal';
import ThroughoutFriendsModal, { friendsDataType } from './components/ThroughoutFriends';
import userinfoApi from '@/services/staff/userInfo';
import iconEdit from '@/assets/icon-edit.png';
// import {Row, Col} from 'antd'
import styles from './index.less';
// 假设一个用户信息
const userInfo = {
  avator: iconEdit,
  nickName: '复清发展',
  ID: '2698562350',
  sex: '男',
  tel: '12434456546',
  email: 'fuqingfazhan@126.com',
  area: '浙江 杭州',
  sign: 'dsdfggsgsfs',
  QRCode: iconEdit,
};
interface Istate {
  totalItms: number;
  loading: boolean;
  userInfoList: Array<ITableColumn1> | [];
  curPage: number;
  tableList: any[];
  userInfo: userInfoType;
  userInfoVisible: boolean;
  chatLogModalVisible: boolean;
  friendsList: Array<listType>;
  groupList: Array<listType>;
  detailedLogVisible: boolean;
  identityDetailVisible: boolean;
  identityValue: number;
  classData: Array<ITableColumn>;
  throughoutFriendsVisible: boolean;
  friendsData: Array<friendsDataType>;
}
class UserInfo extends React.Component<{}, Istate> {
  state: Istate = {
    totalItms: 0,
    loading: false,
    userInfoList: [],
    curPage: 1,
    tableList: [' 1', '2', ' 1', '2', ' 1', '2'],
    userInfo: userInfo,
    userInfoVisible: false,
    chatLogModalVisible: false,
    friendsList: [
      {
        avator: '',
        name: '',
        logs: '',
      },
    ],
    groupList: [
      {
        avator: '',
        name: '',
        logs: '',
      },
    ],
    detailedLogVisible: false,
    identityDetailVisible: false,
    identityValue: 1,
    classData: [
      {
        No: '',
        class: '',
      },
    ],
    throughoutFriendsVisible: false,
    friendsData: [
      {
        avator: '',
        name: '',
      },
    ],
  };
  componentDidMount() {
    this.getUserInfoTable();
  }
  //获取用户信息表格
  getUserInfoTable = async () => {
    try {
      this.setState({
        loading: true,
      });
      const { result } = await userinfoApi.userInfo(this.state.curPage);
      console.log(result);
      this.setState({
        userInfoList: result.tableList.data,
        totalItms: result.tableList.total,
        loading: false,
      });
    } catch {
      this.setState({
        loading: false,
      });
    }
  };
  //身份选择
  identitySelect = (value: string) => {
    console.log(value);
  };
  //状态选择
  statusSelect = (value: string) => {
    console.log(value);
  };
  //搜索框事件
  handleSearch = (value: string) => {
    console.log(value);
  };
  //跳转页码数
  changePage = (pageNumber: number) => {
    console.log(pageNumber);
  };
  //改变一页的条目数
  changeSize = (current: number, size: number) => {
    console.log(current);
    console.log(size);
  };
  //移出移入黑名单
  changeStatus = (record: ITableColumn1) => {
    // console.log(record);
    if (record.status === '黑名单') {
      const newUserInfo = this.state.userInfoList.filter((item: ITableColumn1) => {
        if (item.No === record.No) {
          console.log(item);
          item.status = '正常';
        }
        return item;
      });
      console.log(newUserInfo);
      this.setState({
        userInfoList: newUserInfo,
      });
    } else {
      const newUserInfo = this.state.userInfoList.filter((item: ITableColumn1) => {
        if (item.No === record.No) {
          item.status = '黑名单';
        }
        return item;
      });
      this.setState({
        userInfoList: newUserInfo,
      });
    }
  };
  //展示用户信息
  readUserInfo = (ID: number) => {
    console.log(ID);
    this.setState({
      userInfoVisible: true,
    });
  };
  userInfoHandleCancel = () => {
    this.setState({
      userInfoVisible: false,
    });
  };
  chatLogHandleCancel = () => {
    this.setState({
      chatLogModalVisible: false,
    });
  };
  readChatLog = (ID: number) => {
    this.setState({
      chatLogModalVisible: true,
      friendsList: [
        {
          avator: iconEdit,
          name: 'qqwqw',
          logs: 'qweretyui',
        },
      ],
      groupList: [
        {
          avator: iconEdit,
          name: 'rrtyt',
          logs: 'ddsgdgfjiyuk',
        },
      ],
    });
  };
  throughoutLogs = () => {
    console.log('hhh');
    this.setState({
      detailedLogVisible: true,
    });
  };
  detailedLogHandleCancel = () => {
    this.setState({
      detailedLogVisible: false,
    });
  };
  itentityDetailHandleCancel = () => {
    this.setState({
      identityDetailVisible: false,
    });
  };
  changeIdentity = (e: any) => {
    console.log(e.target.value);
    this.setState({
      identityValue: e.target.value,
      classData: [
        {
          No: '1',
          class: '111111',
        },
        {
          No: '2',
          class: '11134431',
        },
      ],
    });
  };
  readIdentityDetail = (ID: number) => {
    this.setState({
      identityDetailVisible: true,
    });
  };
  throughoutFriends = (ID: number) => {
    this.setState({
      throughoutFriendsVisible: true,
      friendsData: [
        {
          avator: iconEdit,
          name: 'ddddd',
        },
        {
          avator: iconEdit,
          name: 'ddddd',
        },
      ],
    });
  };
  throughoutFriendsHandleCancel = () => {
    this.setState({
      throughoutFriendsVisible: false,
    });
  };
  render() {
    return (
      <div>
        <PageHeaderWrapper>
          <SelectSearch
            identitySelect={this.identitySelect}
            statusSelect={this.statusSelect}
            handleSearch={this.handleSearch}
          ></SelectSearch>
          <UserTable
            loading={this.state.loading}
            changeStatus={this.changeStatus}
            readUserInfo={this.readUserInfo}
            readChatLog={this.readChatLog}
            readIdentityDetail={this.readIdentityDetail}
            throughoutFriends={this.throughoutFriends}
            list={this.state.userInfoList}
          ></UserTable>
          <DefinedPagination
            curPage={this.state.curPage}
            totalItems={this.state.totalItms}
            changePage={this.changePage}
            changeSize={this.changeSize}
          ></DefinedPagination>
          <UserInfoModal
            userInfoVisible={this.state.userInfoVisible}
            userInfoHandleCancel={this.userInfoHandleCancel}
            userInfo={this.state.userInfo}
          ></UserInfoModal>
          <ChatLogModal
            chatLogModalVisible={this.state.chatLogModalVisible}
            chatLogHandleCancel={this.chatLogHandleCancel}
            friendsList={this.state.friendsList}
            groupList={this.state.groupList}
            throughoutLogs={this.throughoutLogs}
          ></ChatLogModal>
          <DetailedLogModal
            detailedLogVisible={this.state.detailedLogVisible}
            detailedLogHandleCancel={this.detailedLogHandleCancel}
          ></DetailedLogModal>
          <IdentityDetailModal
            identityDetailVisible={this.state.identityDetailVisible}
            itentityDetailHandleCancel={this.itentityDetailHandleCancel}
            changeIdentity={this.changeIdentity}
            identityValue={this.state.identityValue}
            classData={this.state.classData}
          ></IdentityDetailModal>
          <ThroughoutFriendsModal
            throughoutFriendsVisible={this.state.throughoutFriendsVisible}
            throughoutFriendsHandleCancel={this.throughoutFriendsHandleCancel}
            friendsData={this.state.friendsData}
          ></ThroughoutFriendsModal>
        </PageHeaderWrapper>
      </div>
    );
  }
}
export default UserInfo;
