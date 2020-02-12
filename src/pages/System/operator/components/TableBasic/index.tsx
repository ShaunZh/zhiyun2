import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import styles from './index.less';
import TableAction from '@/components/TableAction';
import iconEdit from '@/assets/icon-edit.png';
import iconDel from '@/assets/icon-del.png';
import iconSend from '@/assets/icon-send.png';

export interface ITableColumn {
  key: number;
  No: number;
  account: string;
  operator: string;
  mobile: string;
  role: string;
  status: string;
  time: string;
  action: string;
}

interface ITableProps {
  loading: boolean;
  list: Array<ITableColumn> | [];
  handleActionEdit: (index: number) => void;
  handleActionDelete: (index: number) => void;
  handleActionSend: (index: number) => void;
}

export default (props: ITableProps) => {
  const { loading, list, handleActionEdit, handleActionDelete, handleActionSend } = props;
  const columns: ColumnProps<ITableColumn>[] = [
    {
      title: 'No',
      dataIndex: 'No',
      key: 'No',
    },
    {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: '操作员',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: '手机号码',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (status: string) => <span className={`status-${status}`}>{status}</span>,
    },
    {
      title: '发送时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      width: 200,
      render: (text: string, record: ITableColumn, index: number) => (
        <div className={styles.action}>
          <TableAction
            iconSrc={iconEdit}
            hoverTip="编辑"
            handleClick={() => handleActionEdit(index)}
          ></TableAction>
          <TableAction
            iconSrc={iconDel}
            hoverTip="删除"
            handleClick={() => handleActionDelete(index)}
          ></TableAction>
          <TableAction
            iconSrc={iconSend}
            hoverTip="发送"
            handleClick={() => handleActionSend(index)}
          ></TableAction>
        </div>
      ),
    },
  ];
  const loadingConfig = {
    // 延时500毫秒展示loading，防止闪烁
    delay: 500,
    spinning: loading,
  };

  console.log('lllllll', list);

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
