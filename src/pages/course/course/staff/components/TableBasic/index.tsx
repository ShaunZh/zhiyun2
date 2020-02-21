import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import styles from './index.less';

export interface ITableColumn {
  key: string;
  No: string;
  id: string;
  name: string;
  sex: number;
  intro?: string;
}
export enum EStaffType {
  masterAdmin = 'masterAdmin',
  admin = 'admin',
  teacher = 'teacher',
  member = 'member',
}

interface ITableProps {
  loading: boolean;
  list: Array<ITableColumn> | [];
  type: EStaffType;
}

export default (props: ITableProps) => {
  const { loading, list, type } = props;

  const loadingConfig = {
    // 延时500毫秒展示loading，防止闪烁
    delay: 500,
    spinning: loading,
  };

  const getStaffName = (t: EStaffType) => {
    switch (t) {
      case EStaffType.masterAdmin:
        return '总管理员';
      case EStaffType.admin:
        return '管理员';
      case EStaffType.teacher:
        return '教师';
      case EStaffType.member:
        return '会员';
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
  ];

  const getColumns = (t: EStaffType, columnsList: ColumnProps<ITableColumn>[]) => {
    if (t === EStaffType.teacher) {
      columnsList.push({
        title: '教师简介',
        dataIndex: 'intro',
        key: 'intro',
        width: 700,
      });
    }
    return columnsList;
  };

  const columns = getColumns(type, initColumns);

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
