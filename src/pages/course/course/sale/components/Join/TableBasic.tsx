import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';

export interface ITableColumn {
  No: string;
  key: string;
  name: string;
  sex: string;
  contact: string; // 联系方式
  email: string;
  likeCourse: string; // 喜欢的课程
  joinTime: string; // 报名时间
}

interface ITableProps {
  loading: boolean;
  list: Array<ITableColumn> | [];
  className?: string;
}

export default (props: ITableProps) => {
  const { loading, list, className } = props;
  const initColumns: ColumnProps<ITableColumn>[] = [
    {
      title: 'No.',
      dataIndex: 'No',
      key: 'No',
    },
    {
      title: '报名人员',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (text: string, record: ITableColumn) => (
        <span>{record.sex === '1' ? '男' : '女'}</span>
      ),
    },
    {
      title: '联系方式',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '邮箱地址',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '偏爱课程',
      dataIndex: 'likeCourse',
      key: 'likeCourse',
    },
    {
      title: '报名时间',
      dataIndex: 'joinTime',
      key: 'joinTime',
    },
  ];
  const loadingConfig = {
    // 延时500毫秒展示loading，防止闪烁
    delay: 500,
    spinning: loading,
  };

  return (
    <Table
      className={className}
      loading={loadingConfig}
      columns={initColumns}
      rowKey="key"
      dataSource={list}
      rowClassName={() => `table-row-height`}
      pagination={false}
    />
  );
};
