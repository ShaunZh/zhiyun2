import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import styles from './index.less';
import TableAction from '@/components/TableAction';
import iconEdit from '@/assets/icon-edit.png';

export interface ITableColumn {
  key: string;
  name: string;
  type: string;
  status: string;
}

interface ITableProps {
  loading: boolean;
  list: Array<ITableColumn> | [];
  handleActionEnable: (index: number) => void;
}

export default (props: ITableProps) => {
  const { loading, list, handleActionEnable } = props;
  const columns: ColumnProps<ITableColumn>[] = [
    {
      title: '资源名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '资源类型',
      dataIndex: 'type',
      key: 'type',
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
            hoverTip={record.status === 'Y' ? '禁用' : '启用'}
            handleClick={() => handleActionEnable(index)}
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
