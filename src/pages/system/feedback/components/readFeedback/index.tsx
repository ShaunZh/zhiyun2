import React from 'react';
import { Modal,Button } from 'antd';
interface propsTypes{
    readFeedbackVisible:boolean;
    readFeedbackHandleClosed:()=>void;
    readFeedbackValue:string
}
export default (props:propsTypes ) => {
  return (
    <Modal
      visible={props.readFeedbackVisible}
      title="查看反馈"
      footer={[
        <Button key="back" onClick={props.readFeedbackHandleClosed}>
          关闭
        </Button>,
      ]}
    >
      <p>{props.readFeedbackValue}</p>
    </Modal>
  );
};
