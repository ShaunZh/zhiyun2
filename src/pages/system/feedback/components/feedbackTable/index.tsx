import React from 'react';
import styles from './index.less';
import { Tag, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';

export interface ITableColumn {
  No: number;
  ID: number;
  content: string;
  user: string;
  tel: string;
  time: string;
  operator: string;
  status: string;
}
interface propsType {
  loading:boolean;
  data: Array<ITableColumn> | [];
  alertModal: (record:ITableColumn) => void;
}
export default (props: propsType) => {
  const columns: ColumnProps<ITableColumn>[] = [
    {
      title: 'No',
      dataIndex: 'No',
      key: 'No',
    },
    {
      title: '反馈ID',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: '反馈内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '反馈人',
      key: 'user',
      dataIndex: 'user',
    },
    {
      title: '反馈人手机号',
      key: 'tel',
      dataIndex: 'tel',
    },
    {
      title: '提交时间',
      key: 'time',
      dataIndex: 'time',
    },
    {
      title: '处理责任人',
      key: 'operator',
      dataIndex: 'operator',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (status: string) => {
        return (
          <span>
            {status == '已处理' ? <Tag color="green">已处理</Tag> : <Tag color="red">未处理</Tag>}
          </span>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      render: (action: string, record: ITableColumn, index: number) => {
        return (
          <span
            className={styles.action}
            onClick={() => {
              props.alertModal(record);
            }}
          >
            {record.status==='已处理'?'查看处理反馈':'标为已处理'}
          </span>
        );
      },
    },
  ];
  const loadingConfig = {
    // 延时500毫秒展示loading，防止闪烁
    delay: 500,
    spinning: props.loading,
  };
  return <Table columns={columns} dataSource={props.data} rowKey="No" pagination={false} loading={loadingConfig} className={styles.table} />;
};
