import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import styles from './index.less';
import TableAction from '@/components/TableAction';
import iconEdit from '@/assets/icon-edit.png';
import iconDel from '@/assets/icon-del.png';
import iconSend from '@/assets/icon-send.png';

export interface ITableColumn {
  key: string;
  No: number;
  title: string;
  content: string;
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
      title: '消息名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '消息内容',
      dataIndex: 'content',
      key: 'content',
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
