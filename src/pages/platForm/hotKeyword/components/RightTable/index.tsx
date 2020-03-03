import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
export interface ITableColumn {
  rank: number;
  keyword: string;
  times: number;
}
interface propsType {
  list: Array<ITableColumn> | [];
}
export default (props: propsType) => {
  const columns: ColumnProps<ITableColumn>[] = [
    {
      title: '热搜排名',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: '热搜关键字',
      dataIndex: 'keyword',
      key: 'keyword',
    },
    {
      title: '热搜指数',
      dataIndex: 'times',
      key: 'times',
    },
  ];
  return (
    <div>
      <Table columns={columns} rowKey="rank" dataSource={props.list} pagination={false} />
    </div>
  );
};
