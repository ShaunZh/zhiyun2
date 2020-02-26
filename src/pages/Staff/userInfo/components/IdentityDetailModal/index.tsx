import React from 'react';
import { Modal, Radio, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
export interface ITableColumn {
  No: string;
  class: string;
}
interface propsType {
  identityDetailVisible: boolean;
  itentityDetailHandleCancel: () => void;
  changeIdentity: (e: any) => void;
  identityValue: number;
  classData: Array<ITableColumn>;
}
export default (props: propsType) => {
  const columns: ColumnProps<ITableColumn>[] = [
    {
      title: 'No',
      dataIndex: 'No',
      key: 'No',
    },
    {
      title: '所在课程',
      dataIndex: 'class',
      key: 'class',
    },
  ];
  return (
    <Modal
      visible={props.identityDetailVisible}
      title="
      人员管理/用户信息管理/查看用户课程
      "
      onCancel={props.itentityDetailHandleCancel}
      footer={null}
    >
      <div>
        <div>
          <Radio.Group onChange={props.changeIdentity} value={props.identityValue}>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </Radio.Group>
        </div>
        <div>
          <Table columns={columns} dataSource={props.classData} rowKey="No" pagination={false} />
        </div>
      </div>
    </Modal>
  );
};
