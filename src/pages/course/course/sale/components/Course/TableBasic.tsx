import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';

import styles from './index.less';

import ResourceInModal from '@/components/ResourceInModal';

export interface ITableColumn {
  key: string;
  name: string;
  number: string;
  price: number;
  intro: string; // 简介
  sale: number; // 销售量
  collection: number; // 收藏数
  status: string; // 状态
}

interface ITableProps {
  loading: boolean;
  list: Array<ITableColumn> | [];
  handleActionEnable: (index: number) => void;
}

export default (props: ITableProps) => {
  const { loading, list, handleActionEnable } = props;

  const loadingConfig = {
    // 延时500毫秒展示loading，防止闪烁
    delay: 500,
    spinning: loading,
  };

  const initColumns: ColumnProps<ITableColumn>[] = [
    {
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '课程价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '课程简介',
      dataIndex: 'intro',
      key: 'intro',
      render: (text: string, record: ITableColumn) => (
        <ResourceInModal name="查看简介" type="richText" link={record.number}></ResourceInModal>
      ),
    },
    {
      title: '平台销售量',
      dataIndex: 'sale',
      key: 'sale',
    },
    {
      title: '平台收藏数',
      dataIndex: 'collection',
      key: 'collection',
    },

    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      width: 200,
      render: (text: string, record: ITableColumn, index: number) => (
        <span className={styles.action} onClick={() => handleActionEnable(index)}>
          {record.status === 'Y' ? '禁用' : '启用'}
        </span>
      ),
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
