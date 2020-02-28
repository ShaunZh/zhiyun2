import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { DatePicker, Spin } from 'antd';
import { RangePickerValue } from 'antd/lib/date-picker/interface';

import LiveBlock from './components/LiveBlock';

import styles from './index.less';
import liveApi from './service';

import { ILiveInfoItem } from './data.d';

const { RangePicker } = DatePicker;

interface IState {
  listQuery: {
    datePicker: [string, string];
  };
  list: Array<ILiveInfoItem>;
  loading: boolean;
}

interface IListParams {
  datePicker?: [string, string];
}
class Live extends React.Component<{}, IState> {
  state: IState = {
    loading: false,
    listQuery: {
      datePicker: ['', ''],
    },
    list: [],
  };

  componentDidMount() {
    this.fetchList({});
  }

  fetchList = async (queryParams: IListParams) => {
    try {
      this.setState({
        loading: true,
      });
      const { datePicker = this.state.listQuery.datePicker } = queryParams;
      const {
        result: { data },
      } = await liveApi.list({
        liveDate: datePicker[0],
      });

      this.setState({
        list: data,
        loading: false,
        listQuery: {
          datePicker,
        },
      });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  };

  handleDatePicker = (value: RangePickerValue, dateString: [string, string]) => {
    this.setState({
      listQuery: {
        datePicker: dateString,
      },
    });
  };

  handleDatePickerOk = () => {
    this.fetchList({});
  };

  render() {
    const { loading, list } = this.state;
    return (
      <PageHeaderWrapper className={styles.main}>
        <Spin spinning={loading} className={styles.loading} />
        <div className={styles.filter}>
          时间:
          <RangePicker
            className={styles.datePicker}
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            placeholder={['开始时间', '结束时间']}
            onChange={this.handleDatePicker}
            onOk={this.handleDatePickerOk}
          />
        </div>
        <div>
          {list.map(item => (
            <LiveBlock key={item.courseNumber} {...item}></LiveBlock>
          ))}
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Live;
