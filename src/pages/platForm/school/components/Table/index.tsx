import React from 'react';
import { Table, Row, Col, Tag } from 'antd';
import { ColumnProps } from 'antd/es/table';
import styles from './index.less';

export interface ITableColumn {
  No: number;
  account: string;
  logo: string;
  title: string;
  masterID: string;
  masterName: string;
  tel: string;
  registerTime: string;
  status: string;
  score: number;
}
interface propsType {
  loading: boolean;
  list: Array<ITableColumn> | [];
  changeSchoolStatus: (record: ITableColumn) => void;
  lookCustomerService: (record: ITableColumn) => void;
}
export default (props: propsType) => {
  const columns: ColumnProps<ITableColumn>[] = [
    {
      title: 'No',
      dataIndex: 'No',
      key: 'No',
    },
    {
      title: '网校logo',
      dataIndex: 'logo',
      key: 'logo',
      render: (text: string) => {
        return <img src={text}></img>;
      },
    },
    {
      title: '网校名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '校长ID',
      dataIndex: 'masterID',
      key: 'masterID',
    },
    {
      title: '校长姓名',
      dataIndex: 'masterName',
      key: 'masterName',
    },
    {
      title: '联系方式',
      key: 'tel',
      dataIndex: 'tel',
    },
    {
      title: '注册时间',
      dataIndex: 'registerTime',
      key: 'registerTime',
    },
    {
      title: '网校状态',
      key: 'status',
      dataIndex: 'status',
      render: (text: string) => {
        return (
          <div>
            {text === '已禁用' ? <Tag color="red">{text}</Tag> : <Tag color="green">{text}</Tag>}
          </div>
        );
      },
    },
    {
      title: '评分',
      key: 'score',
      dataIndex: 'score',
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      render: (text: string, record: ITableColumn, index: number) => {
        return (
          <Row className={styles.row}>
            <Col span={12}>
              <span
                onClick={() => {
                  props.changeSchoolStatus(record);
                }}
              >
                {record.status === '已启用' ? '禁用' : '启用'}
              </span>
            </Col>
            <Col span={12}>
              <span
                onClick={() => {
                  props.lookCustomerService(record);
                }}
              >
                查看客服
              </span>
            </Col>
          </Row>
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
    <div>
      <Table
        loading={loadingConfig}
        columns={columns}
        rowKey="No"
        dataSource={props.list}
        pagination={false}
        className={styles.table}
      />
    </div>
  );
};
