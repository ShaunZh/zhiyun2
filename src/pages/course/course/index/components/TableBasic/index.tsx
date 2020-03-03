import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Link } from 'umi';
import styles from './index.less';
import TableAction from '@/components/TableAction';
import iconEdit from '@/assets/icon-edit.png';
import iconDel from '@/assets/icon-del.png';
import iconSend from '@/assets/icon-send.png';

import { IListQueryParams } from '../../data.d';
import consts from '../../consts';

// 状态组件
const Status = (status: string) => {
  if (status === 'Y') {
    return <span className={styles.enable}>已启用</span>;
  }
  return <span className={styles.disable}>已禁用</span>;
};

export interface ITableColumn {
  key: string;
  No: number;
  name: string;
  category: string;
  collection: number;
  link: string;
  time: string;
  status: string;
  up: string;
  school: string;
  action: string;
}

interface ITableProps {
  loading: boolean;
  list: Array<ITableColumn> | [];
  handleActionEnable: (index: number) => void;
  listQuery: IListQueryParams;
}

export default (props: ITableProps) => {
  const { loading, list, handleActionEnable, listQuery } = props;
  const setListQueryToSession = () => {
    sessionStorage.setItem(consts.session.listQuery, JSON.stringify(listQuery));
  };
  const columns: ColumnProps<ITableColumn>[] = [
    {
      title: 'No',
      dataIndex: 'No',
      key: 'No',
    },
    {
      title: '课程命名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '收藏数',
      dataIndex: 'collection',
      key: 'collection',
      width: 80,
    },
    {
      title: '课程链接',
      dataIndex: 'link',
      key: 'link',
    },
    {
      title: '创建时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '课程状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (text: string, record: ITableColumn) => Status(record.status),
    },
    {
      title: '是否上架到平台',
      dataIndex: 'up',
      key: 'up',
      width: 140,
      render: (text: string, record: ITableColumn) => (
        <span>{record.up === 'Y' ? '是' : '否'}</span>
      ),
    },
    {
      title: '所属网校',
      dataIndex: 'school',
      key: 'school',
      width: 100,
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
          <span onClick={setListQueryToSession}>
            <Link to="/course/staff">
              <TableAction iconSrc={iconDel} hoverTip="人员信息"></TableAction>
            </Link>
          </span>
          <Link to="/course/resources">
            <TableAction iconSrc={iconSend} hoverTip="课程资源"></TableAction>
          </Link>
          <Link to="/course/live">
            <TableAction iconSrc={iconSend} hoverTip="直播间"></TableAction>
          </Link>
          <Link to="/course/sale">
            <TableAction iconSrc={iconSend} hoverTip="上架信息"></TableAction>
          </Link>
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
        pagination={false}
      />
    </div>
  );
};
