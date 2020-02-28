import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';

import styles from './index.less';

interface ITableColumn {
  key: string;
  question: {
    title: string; // 提问标题
    number: string; // 问题编号
  };
  discuss: string; // 讨论
}

interface ITableProps {
  loading: boolean;
  list: Array<ITableColumn> | [];
}

export default (props: ITableProps) => {
  const { loading, list } = props;

  const loadingConfig = {
    // 延时500毫秒展示loading，防止闪烁
    delay: 500,
    spinning: loading,
  };

  const initColumns: ColumnProps<ITableColumn>[] = [
    {
      title: '提问',
      dataIndex: 'question',
      key: 'question',
      render: (text: string) => <span className={styles.col}>{text}</span>,
    },
    {
      title: '讨论',
      dataIndex: 'action',
      key: 'action',
      render: () => <span className={styles.col}>查看</span>,
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
