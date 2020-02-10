import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import styles from './index.less';
import TableAction from '@/components/TableAction';
import iconEdit from '@/assets/icon-edit.png';
import iconDel from '@/assets/icon-del.png';
import iconSend from '@/assets/icon-send.png';

const editAction = (id: string) => {
  console.log('edit action: ', id);
};

const deleteAction = (id: string) => {
  console.log('delete action: ', id);
};

const sendAction = (id: string) => {
  console.log('send action: ', id);
};

interface ITableColumn {
  key: string;
  No: string;
  account: string;
  operator: string;
  mobile: string;
  role: string;
  status: string;
  time: string;
  action: string;
}

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
    render: (text: string, record: ITableColumn) => (
      <div className={styles.action}>
        <TableAction
          iconSrc={iconEdit}
          hoverTip="编辑"
          handleClick={() => editAction(record.key)}
        ></TableAction>
        <TableAction
          iconSrc={iconDel}
          hoverTip="删除"
          handleClick={() => deleteAction(record.key)}
        ></TableAction>
        <TableAction
          iconSrc={iconSend}
          hoverTip="发送"
          handleClick={() => sendAction(record.key)}
        ></TableAction>
      </div>
    ),
  },
];

const data: ITableColumn[] = [
  // {
  //   key: '1',
  //   No: '1',
  //   account: '01111111',
  //   operator: '张小虾',
  //   mobile: '13900001111',
  //   role: '超级管理员',
  //   status: 'enable',
  //   time: '2019-01-01  10:00:00',
  //   action: 'id 1',
  // },
  // {
  //   key: '2',
  //   No: '2',
  //   account: '01111111',
  //   operator: '张小虾',
  //   mobile: '13900001111',
  //   role: '超级管理员',
  //   status: 'enable',
  //   time: '2019-01-01  10:00:00',
  //   action: 'id 2',
  // },
  // {
  //   key: '3',
  //   No: '3',
  //   account: '01111111',
  //   operator: '张小虾',
  //   mobile: '13900001111',
  //   role: '超级管理员',
  //   status: 'enable',
  //   time: '2019-01-01  10:00:00',
  //   action: 'id 3',
  // },
  // {
  //   key: '4',
  //   No: '4',
  //   account: '01111111',
  //   operator: '张小虾',
  //   mobile: '13900001111',
  //   role: '超级管理员',
  //   status: 'enable',
  //   time: '2019-01-01  10:00:00',
  //   action: 'id 4',
  // },
  // {
  //   key: '10',
  //   No: '1',
  //   account: '01111111',
  //   operator: '张小虾',
  //   mobile: '13900001111',
  //   role: '超级管理员',
  //   status: 'enable',
  //   time: '2019-01-01  10:00:00',
  //   action: 'id 1',
  // },
  // {
  //   key: '20',
  //   No: '2',
  //   account: '01111111',
  //   operator: '张小虾',
  //   mobile: '13900001111',
  //   role: '超级管理员',
  //   status: 'enable',
  //   time: '2019-01-01  10:00:00',
  //   action: 'id 2',
  // },
  // {
  //   key: '30',
  //   No: '3',
  //   account: '01111111',
  //   operator: '张小虾',
  //   mobile: '13900001111',
  //   role: '超级管理员',
  //   status: 'enable',
  //   time: '2019-01-01  10:00:00',
  //   action: 'id 3',
  // },
  // {
  //   key: '40',
  //   No: '4',
  //   account: '01111111',
  //   operator: '张小虾',
  //   mobile: '13900001111',
  //   role: '超级管理员',
  //   status: 'enable',
  //   time: '2019-01-01  10:00:00',
  //   action: 'id 4',
  // },
  // {
  //   key: '11',
  //   No: '1',
  //   account: '01111111',
  //   operator: '张小虾',
  //   mobile: '13900001111',
  //   role: '超级管理员',
  //   status: 'enable',
  //   time: '2019-01-01  10:00:00',
  //   action: 'id 1',
  // },
  // {
  //   key: '21',
  //   No: '2',
  //   account: '01111111',
  //   operator: '张小虾',
  //   mobile: '13900001111',
  //   role: '超级管理员',
  //   status: 'enable',
  //   time: '2019-01-01  10:00:00',
  //   action: 'id 2',
  // },
  // {
  //   key: '31',
  //   No: '3',
  //   account: '01111111',
  //   operator: '张小虾',
  //   mobile: '13900001111',
  //   role: '超级管理员',
  //   status: 'enable',
  //   time: '2019-01-01  10:00:00',
  //   action: 'id 3',
  // },
  // {
  //   key: '41',
  //   No: '4',
  //   account: '01111111',
  //   operator: '张小虾',
  //   mobile: '13900001111',
  //   role: '超级管理员',
  //   status: 'enable',
  //   time: '2019-01-01  10:00:00',
  //   action: 'id 4',
  // },
];

// 分页配置
const pagination = {
  showQuickJumper: true,
  showSizeChanger: true,
};

export default () => {
  const onChange = () => {
    console.log('get next page');
  };
  return (
    <div className={styles.container}>
      <Table
        columns={columns}
        dataSource={data}
        rowClassName={() => `table-row-height`}
        pagination={pagination}
        onChange={() => onChange()}
      />
    </div>
  );
};
