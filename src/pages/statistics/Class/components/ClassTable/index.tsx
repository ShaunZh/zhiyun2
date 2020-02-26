import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
export interface ITableColumn {
  key: number;
  category: string;
  amount: number;
}
interface propsType {
  loading:boolean;
  classList: Array<ITableColumn>;
}
export default (props: propsType) => {
  const columns: ColumnProps<ITableColumn>[] = [
    {
      title: '课程分类',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '课程数',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];
  const loadingConfig = {
    // 延时500毫秒展示loading，防止闪烁
    delay: 500,
    spinning: props.loading,
  };
  return (
    <Table
      loading={loadingConfig}
      columns={columns}
      rowKey="key"
      dataSource={props.classList}
      pagination={false}
    />
  );
};
