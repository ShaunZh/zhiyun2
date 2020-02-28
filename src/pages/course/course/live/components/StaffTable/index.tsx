import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';

// import { ETableType } from '../../data.d';
import styles from './index.less';

export interface ITableColumn {
  key: string;
  No: string;
  id: string;
  name: string;
  sex: number;
  startTime: string;
  endTime: string;
}

interface ITableProps {
  loading: boolean;
  list: Array<ITableColumn> | [];
  type: string;
}

export default (props: ITableProps) => {
  const { loading, list, type } = props;

  const loadingConfig = {
    // 延时500毫秒展示loading，防止闪烁
    delay: 500,
    spinning: loading,
  };

  const getStaffName = (t: string) => {
    switch (t) {
      case '0':
        return '总管理员';
      case '1':
        return '管理员';
      case '2':
        return '教师';
      case '3':
        return '学员';
      default:
        return '';
    }
  };

  const initColumns: ColumnProps<ITableColumn>[] = [
    {
      title: 'No.',
      dataIndex: 'No',
      key: 'No.',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: getStaffName(type),
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (text: string, record: ITableColumn) => <span>{record.sex === 1 ? '男' : '女'}</span>,
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
    },
  ];

  const columns = initColumns;

  return (
    <div className={styles.container}>
      <Table
        loading={loadingConfig}
        columns={columns}
        rowKey="key"
        dataSource={list}
        rowClassName={() => `table-row-height`}
        pagination={false}
      />
    </div>
  );
};
