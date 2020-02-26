import React from 'react';
import { Table, Row, Col } from 'antd';
import { ColumnProps } from 'antd/es/table';
import styles from './index.less';
export interface ITableColumn {
  No: number;
  updataFile: string;
  updateTime: string;
  status: string;
}
interface propsType {
  loading: boolean;
  tableList: Array<ITableColumn>;
  forbid: (No: number) => void;
  delete: (No: number) => void;
}
export default (props: propsType) => {
  const columns: ColumnProps<ITableColumn>[] = [
    {
      title: 'No',
      dataIndex: 'No',
      key: 'No',
    },
    {
      title: '上传文件',
      dataIndex: 'updataFile',
      key: 'updataFile',
    },
    {
      title: '更新时间',
      dataIndex: 'updataTime',
      key: 'updataTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: ITableColumn) => {
        return (
          <Row>
            <Col span={12} className={styles.col}>
              <span
                className={styles.span}
                onClick={() => {
                  props.forbid(record.No);
                }}
              >
                禁用
              </span>
            </Col>
            <Col span={12} className={styles.col}>
              <span
                className={styles.span}
                onClick={() => {
                  props.delete(record.No);
                }}
              >
                删除
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
    <Table
      className={styles.table}
      loading={loadingConfig}
      columns={columns}
      rowKey="No"
      dataSource={props.tableList}
      pagination={false}
    />
  );
};
