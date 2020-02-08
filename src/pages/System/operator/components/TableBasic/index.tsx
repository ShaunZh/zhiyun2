import React from 'react';
import { Table, Divider } from 'antd';
import styles from './index.less';

const columns = [
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
    render: (text, record) => (
      <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    ),
  },
];

const data = [
  {
    No: '1',
    account: '01111111',
    operator: '张小虾',
    mobile: '13900001111',
    role: '超级管理员',
    status: 'enable',
    time: '2019-01-01  10:00:00',
  },
  {
    No: '2',
    account: '01111111',
    operator: '张小虾',
    mobile: '13900001111',
    role: '超级管理员',
    status: 'enable',
    time: '2019-01-01  10:00:00',
  },
  {
    No: '3',
    account: '01111111',
    operator: '张小虾',
    mobile: '13900001111',
    role: '超级管理员',
    status: 'enable',
    time: '2019-01-01  10:00:00',
  },
  {
    No: '4',
    account: '01111111',
    operator: '张小虾',
    mobile: '13900001111',
    role: '超级管理员',
    status: 'enable',
    time: '2019-01-01  10:00:00',
  },
];

export default () => (
  <div className={styles.container}>
    <div id="components-table-demo-basic">
      <Table columns={columns} dataSource={data} />
    </div>
  </div>
);
