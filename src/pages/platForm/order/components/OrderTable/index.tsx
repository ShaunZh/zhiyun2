import React from 'react';
import { Tag, Table, Row, Col } from 'antd';
import { ColumnProps } from 'antd/es/table';
import styles from './index.less';
export interface ITableColumn {
  No: number;
  orderAccount: number;
  school: string;
  classTitle: string;
  price: number;
  user: string;
  tel: string;
  payWay: string;
  time: string;
  status: string;
}
interface propsType {
  loading: boolean;
  list: Array<ITableColumn>;
  classDetails:(record:ITableColumn)=>void
}
export default (props: propsType) => {
  const columns: ColumnProps<ITableColumn>[] = [
    {
      title: 'No',
      dataIndex: 'No',
      key: 'No',
    },
    {
      title: '订单号',
      dataIndex: 'orderAccount',
      key: 'orderAccount',
    },
    {
      title: '所属网校',
      dataIndex: 'school',
      key: 'school',
    },
    {
      title: '课程名称',
      dataIndex: 'classTitle',
      key: 'classTitle',
      render: (text: string,record:ITableColumn) => {
        return <span onClick={()=>props.classDetails(record)} className={styles.span}>{text}</span>;
      },
    },
    {
      title: '课程价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '下单用户',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: '用户手机号',
      dataIndex: 'tel',
      key: 'tel',
    },
    {
      title: '支付方式',
      dataIndex: 'payWay',
      key: 'payWay',
    },
    {
      title: '下单时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => {
        return (
          <div>
            {text === '已付款' ? <Tag color="green">已付款</Tag> : <Tag color="red">未付款</Tag>}
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
    <div>
      <Table
        loading={loadingConfig}
        columns={columns}
        rowKey="No"
        dataSource={props.list}
        pagination={false}
      />
      <Row className={styles.compute}>
        <Col span={18}></Col>
        <Col span={3}>订单总数：</Col>
        <Col span={3}>订单总额：</Col>
      </Row>
    </div>
  );
};
