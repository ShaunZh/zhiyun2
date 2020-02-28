import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import styles from './index.less';
import TableAction from '@/components/TableAction';
import iconEdit from '@/assets/icon-edit.png';
import iconDel from '@/assets/icon-del.png';

export interface ITableColumn {
  key: string;
  No: number;
  number: string;
  categoryName: string;
  updateTime: string;
}

interface ITableProps {
  loading: boolean;
  list: Array<ITableColumn> | [];
  handleActionEdit: (index: number) => void;
  handleActionDelete: (index: number) => void;
}

export default (props: ITableProps) => {
  const { loading, list, handleActionEdit, handleActionDelete } = props;
  const columns: ColumnProps<ITableColumn>[] = [
    {
      title: 'No',
      dataIndex: 'No',
      key: 'No',
    },
    {
      title: '分类名称',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'oupdateTime',
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
