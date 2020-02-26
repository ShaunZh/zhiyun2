import React from 'react';
import { Table, Row, Col } from 'antd';
import styles from './index.less';
import { ColumnProps } from 'antd/es/table';
export interface ITableColumn {
  key:number;
  class: string;
  classKB: string;
  storage: string;
  storageKB: string;
}

interface ITableProps {
  loading: boolean;
  space1: string;
  space2: string;
  list: Array<ITableColumn> | [];
  space: {
    totalSpace: string;
    usedSpace: string;
    leftSpace: string;
  };
}
export default (props: ITableProps) => {
  const { space1 = '100G', space2 = '70G', list, space } = props;
  const columns: ColumnProps<ITableColumn>[] = [
    {
      title: '课程总资源',
      dataIndex: 'class',
      className: `${styles.BC}`,
    },
    {
      title: space1,
      dataIndex: 'classKB',
      // defaultSortOrder: 'descend',
      sorter: (a: ITableColumn, b: ITableColumn) =>
        Number(a.classKB.substring(0, a.classKB.length - 2)) -
        Number(b.classKB.substring(0, a.classKB.length - 2)),
    },
    {
      title: '云盘总资源',
      dataIndex: 'storage',
      className: `${styles.BC}`,
    },
    {
      title: space2,
      dataIndex: 'storageKB',
      // defaultSortOrder: 'descend',
      sorter: (a: ITableColumn, b: ITableColumn) =>
        Number(a.storageKB.substring(0, a.storageKB.length - 2)) -
        Number(b.storageKB.substring(0, a.storageKB.length - 2)),
    },
  ];
  const loadingConfig = {
    // 延时500毫秒展示loading，防止闪烁
    delay: 500,
    spinning: props.loading,
  };
  return (
    <div>
      <Row type="flex" justify="end" className={styles.row}>
        <Col span={8}>
          <div className={styles.fistLine}>总空间</div>
          <div className={styles.secondLine}>{space.totalSpace}</div>
        </Col>
        <Col span={8}>
          <div className={styles.fistLine}>已用空间</div>
          <div className={styles.secondLine}>{space.usedSpace}</div>
        </Col>
        <Col span={8}>
          <div className={styles.fistLine}>剩余空间</div>
          <div className={styles.secondLine}>{space.leftSpace}</div>
        </Col>
      </Row>
      <Table
        columns={columns}
        rowKey="key"
        dataSource={list}
        pagination={false}
        loading={loadingConfig}
      />
    </div>
  );
};
