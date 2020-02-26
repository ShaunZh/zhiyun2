import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import styles from './index.less';
import feedbackApi from '@/services/system/feedback';
import StatusSelect from '@/components/statusSelect';
import CreateModal from './components/createFeedback';
import ReadModal from './components/readFeedback';
import { message } from 'antd';
import FeedbackTable, { ITableColumn } from './components/feedbackTable';
import DefinedPagination from '@/components/pagination';
interface IState {
  totalItems: number;
  loading: boolean;
  options: { label: string; value: string }[];
  feedbackData: Array<ITableColumn> | [];
  curPage: number;
  createFeedbackVisible: boolean;
  textAreaValue: string;
  readFeedbackVisible: boolean;
  readFeedbackValue: string;
  currentObject: ITableColumn;
}
class Feedback extends React.Component<{}, IState> {
  state: IState = {
    currentObject: {
      No: 0,
      ID: 0,
      content: '',
      user: '',
      tel: '',
      time: '',
      operator: '',
      status: '',
    },
    totalItems: 1,
    options: [
      {
        label: '全部',
        value: 'all',
      },
      {
        label: '已处理',
        value: 'finished',
      },
      {
        label: '未处理',
        value: 'unfinished',
      },
    ],
    feedbackData: [],
    curPage: 1,
    createFeedbackVisible: false,
    textAreaValue: '',
    readFeedbackVisible: false,
    readFeedbackValue: '',
    loading: false,
  };
  componentDidMount() {
    //获取表格数据F
    this.getFeedbackTable();
  }
  changePage = (pageNumber: number) => {
    this.getFeedbackTable();
    console.log(pageNumber);
  };
  changeSize = (current: number, size: number) => {
    console.log(current);
    console.log(size);
  };
  //获取表格数据
  getFeedbackTable = async () => {
    try {
      this.setState({
        loading: true,
      });
      const { result } = await feedbackApi.feedbackList({ curPage: this.state.curPage });
      console.log(result);
      this.setState({
        totalItems: result.feedbackList.total,
        feedbackData: result.feedbackList.data,
        loading: false,
      });
    } catch {
      this.setState({
        loading: false,
      });
    }
  };
  handleChangeStatus = (value: string) => {
    console.log(value);
  };
  inputSearch = (value: string) => {
    console.log(value);
  };
  alertModal = (record: ITableColumn) => {
    console.log(record);
    if (record.status === '未处理') {
      this.setState({
        currentObject: record,
        createFeedbackVisible: true,
      });
    } else {
      //获取反馈内容，然后setstate
      this.setState({
        readFeedbackVisible: true,
        readFeedbackValue: '1234567890qerrtyupoipxchfhjhklcvc',
      });
    }
  };
  createFeedbackHandleOk = () => {
    if (this.state.textAreaValue.length > 300) {
      message.warning('字数不能超过300');
      return;
    }
    if (this.state.textAreaValue.length === 0) {
      message.warning('内容不能为空');
      return;
    }
    //发送请求添加反馈
    message.success('操作成功');
    this.setState({
      createFeedbackVisible: false,
      textAreaValue: '',
    });
    console.log(this.state.currentObject);
    const newFeedbackData = this.state.feedbackData.filter((item: ITableColumn) => {
      if (item.No === this.state.currentObject.No) {
        item.status = '已处理';
      }
      return item;
    });
    this.setState({
      feedbackData: newFeedbackData,
    });
  };
  createFeedbackHandleCancel = () => {
    this.setState({
      createFeedbackVisible: false,
      textAreaValue: '',
    });
  };
  //反馈文本框的输入事件
  textAreaChange = (e: any) => {
    console.log(e.target.value);
    this.setState({
      textAreaValue: e.target.value,
    });
  };
  readFeedbackHandleClosed = () => {
    this.setState({
      readFeedbackVisible: false,
    });
  };
  render() {
    return (
      <div>
        <PageHeaderWrapper></PageHeaderWrapper>
        <StatusSelect
          options={this.state.options}
          handleChangeStatus={this.handleChangeStatus}
          inputSearch={this.inputSearch}
        ></StatusSelect>
        <FeedbackTable
          data={this.state.feedbackData}
          alertModal={this.alertModal}
          loading={this.state.loading}
        ></FeedbackTable>
        <DefinedPagination
          curPage={this.state.curPage}
          totalItems={this.state.totalItems}
          changePage={this.changePage}
          changeSize={this.changeSize}
        ></DefinedPagination>
        <CreateModal
          createFeedbackVisible={this.state.createFeedbackVisible}
          textAreaValue={this.state.textAreaValue}
          createFeedbackHandleOk={this.createFeedbackHandleOk}
          createFeedbackHandleCancel={this.createFeedbackHandleCancel}
          textAreaChange={this.textAreaChange}
        ></CreateModal>
        <ReadModal
          readFeedbackVisible={this.state.readFeedbackVisible}
          readFeedbackValue={this.state.readFeedbackValue}
          readFeedbackHandleClosed={this.readFeedbackHandleClosed}
        ></ReadModal>
      </div>
    );
  }
}
export default Feedback;
