import React from 'react';
import { Table, Modal } from 'antd';
import { ColumnProps } from 'antd/es/table';
import styles from './index.less';
import DefinedPagination from '@/components/pagination';
export interface ITableColumn1 {
  No: number;
  ID: string;
  name: string;
}
interface propsType {
  modalVisible: boolean;
  modalHandleCancel: () => void;
  list: Array<ITableColumn1> | [];
  customerServiceNumber: number;
  curPage: number;
  totalItems: number;
  changePage: (pageNumber: number) => void;
  changeSize: (current: number, size: number) => void;
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
      title: '客服ID',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: '客服昵称',
      dataIndex: 'name',
      key: 'name',
    },
  ];
  const loadingConfig = {
    // 延时500毫秒展示loading，防止闪烁
    delay: 500,
    spinning: props.loading,
  };
  return (
    <Modal
      className={styles.modal}
      visible={props.modalVisible}
      title="平台管理/网校管理/查看客服"
      onCancel={props.modalHandleCancel}
      footer={null}
    >
      <div className={styles.amount}>客服人数：{props.customerServiceNumber}</div>
      <Table
        columns={columns}
        rowKey="No"
        dataSource={props.list}
        pagination={false}
        loading={loadingConfig}
      />
      <DefinedPagination
        curPage={props.curPage}
        totalItems={props.totalItems}
        changePage={props.changePage}
        changeSize={props.changeSize}
      ></DefinedPagination>
    </Modal>
  );
};
