import React from 'react';
import { Modal } from 'antd';
interface propsType{
    detailedLogVisible:boolean;
    detailedLogHandleCancel:()=>void
}
export default (props: propsType) => {
  return (
    <Modal
      visible={props.detailedLogVisible}
      onCancel={props.detailedLogHandleCancel}
      footer={null}
    >
      <p>聊天记录</p>
    </Modal>
  );
};
