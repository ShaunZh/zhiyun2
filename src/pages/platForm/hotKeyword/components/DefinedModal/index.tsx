import React from 'react';
import { Modal,Input } from 'antd';
interface propsType {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  AddorEdit: string;
  inputValue:string;
  inputChange:(event: React.ChangeEvent<HTMLInputElement>)=>void;
}
export default (props: propsType) => {
  return (
    <Modal
      title={props.AddorEdit === 'add' ? '新增关键词' : '编辑关键词'}
      visible={props.visible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
    >
      <Input placeholder="请输入关键词" value={props.inputValue} onChange={props.inputChange}/>
    </Modal>
  );
};
