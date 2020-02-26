import React from 'react';
import { ColumnProps } from 'antd/es/table';
import styles from './index.less';
import { Table, Tag, Row, Col } from 'antd';
import iconEdit from '@/assets/icon-edit.png';
import { Link } from 'umi';
// import Avator from '../../../../../assets/icon-del.png';
export interface ITableColumn1 {
  //   key: string;
  No: number;
  ID: number;
  avator: string;
  nickName: string;
  sex: string;
  tel: string;
  loginTime: number;
  registerTime: string;
  identity: string;
  status: string;
  //   action: string;
}
interface propsType {
  list: Array<ITableColumn1> | [];
  changeStatus: (record: ITableColumn1) => void;
  readUserInfo: (ID: number) => void;
  readChatLog: (ID: number) => void;
  readIdentityDetail: (ID: number) => void;
  throughoutFriends: (ID: number) => void;
  loading: boolean;
}
export default (props: propsType) => {
  const columns: ColumnProps<ITableColumn1>[] = [
    {
      title: 'No',
      dataIndex: 'No',
      key: 'No',
    },
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: '头像',
      dataIndex: 'avator',
      key: 'avator',
      render: text => <img src={text} className={styles.image}></img>,
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: '联系方式',
      dataIndex: 'tel',
      key: 'tel',
    },
    {
      title: '登录次数',
      dataIndex: 'loginTime',
      key: 'loginTime',
    },
    {
      title: '注册时间',
      dataIndex: 'registerTime',
      key: 'registerTime',
    },
    {
      title: '身份',
      dataIndex: 'identity',
      key: 'identity',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: text => {
        return (
          <div>
            {text === '黑名单' ? (
              <Tag color="red" className={styles.tag}>
                黑名单
              </Tag>
            ) : (
              <Tag color="green" className={styles.tag}>
                正常
              </Tag>
            )}
          </div>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: ITableColumn1) => {
        return (
          <div>
            <Row type="flex" justify="space-between">
              <Col span={7} className={styles.col}>
                <span className={styles.span} onClick={() => props.changeStatus(record)}>
                  {record.status === '黑名单' ? '移出黑名单' : '加入黑名单'}
                </span>
              </Col>
              <Col span={8}>
                <span className={styles.span} onClick={() => props.readUserInfo(record.ID)}>
                  查看用户信息
                </span>
              </Col>
              <Col span={8}>
                <span className={styles.span} onClick={() => props.readIdentityDetail(record.ID)}>
                  查看身份详情
                </span>
              </Col>
            </Row>
            <Row type="flex" justify="space-between">
              <Col span={7}>
                <span className={styles.span} onClick={() => props.throughoutFriends(record.ID)}>
                  查看好友
                </span>
              </Col>
              <Col span={8}>
                <span className={styles.span} onClick={() => props.readChatLog(record.ID)}>
                  查看聊天记录
                </span>
              </Col>
              <Col span={8}>
                <Link to={`/staff/cloudpie?id=${record.ID}`}>
                  <span className={styles.span}>查看云盘</span>
                </Link>
              </Col>
            </Row>
          </div>
        );
      },
    },
  ];
  const loadingConfig = {
    // 延时500毫秒展示loading，防止闪烁
    delay: 500,
    spinning: props.loading,
  };
  return (
    <Table
      loading={loadingConfig}
      columns={columns}
      rowKey="ID"
      dataSource={props.list}
      pagination={false}
      className={styles.usertable}
    />
  );
};
