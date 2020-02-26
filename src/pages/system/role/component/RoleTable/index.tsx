import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import styles from './index.less';
import TableAction from '@/components/TableAction';
import iconEdit from '@/assets/icon-edit.png';
import iconDel from '@/assets/icon-del.png';
export interface ITableColumn {
  No: number;
  role: string;
  time: string;
  rights: string[];
}
interface ITableProps {
  list: Array<ITableColumn> | [];
  loading: boolean;
  handleActionEdit: (index: number,record:ITableColumn) => void;
  handleActionDelete: (index: number) => void;
}
export default (props: ITableProps) => {
  const { loading, handleActionEdit, handleActionDelete, list } = props;
  const columns: ColumnProps<ITableColumn>[] = [
    {
      title: 'No',
      dataIndex: 'No',
      key: 'No',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '更新时间',
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
            handleClick={() => handleActionEdit(index,record)}
          ></TableAction>
          <TableAction
            iconSrc={iconDel}
            hoverTip="删除"
            handleClick={() => handleActionDelete(index)}
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
    <div>
      <Table
        className={styles.table}
        loading={loadingConfig}
        columns={columns}
        rowKey="No"
        dataSource={list}
        pagination={false}
      />
    </div>
  );
};
