import React from 'react';
import styles from './index.less';
import { Modal, Input } from 'antd';
const { TextArea } = Input;
interface propsType {
  createFeedbackVisible: boolean;
  textAreaValue:string,
  createFeedbackHandleOk: () => void;
  createFeedbackHandleCancel: () => void;
  textAreaChange:(e:any)=>void
}
export default (props: propsType) => {
  return (
    <Modal
      title="处理内容反馈"
      visible={props.createFeedbackVisible}
      onOk={props.createFeedbackHandleOk}
      onCancel={props.createFeedbackHandleCancel}
    >
      <div>
        <TextArea
          value={props.textAreaValue}
          onChange={props.textAreaChange}
          placeholder="Controlled autosize"
          autoSize={{ minRows: 7, maxRows: 18 }}
        />
       {props.textAreaValue.length>300?<div className={styles.more}>字数不能超过300</div>:<div className={styles.less}>字数不能超过300</div>}
      </div>
    </Modal>
  );
};
