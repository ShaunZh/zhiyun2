import React from 'react';
import { Modal, Tabs, Row, Col } from 'antd';
import styles from './index.less';
const { TabPane } = Tabs;
export interface listType {
  avator: string;
  name: string;
  logs: string;
}
interface propsType {
  chatLogModalVisible: boolean;
  chatLogHandleCancel: () => void;
  friendsList: Array<listType>;
  groupList: Array<listType>;
  throughoutLogs:()=>void
}
export default (props: propsType) => {
  return (
    <Modal
      visible={props.chatLogModalVisible}
      title="
      人员管理/用户信息管理/查看聊天记录
      "
      onCancel={props.chatLogHandleCancel}
      footer={null}
    >
      <Tabs defaultActiveKey="1" className={styles.tab}>
        <TabPane tab="好友" key="1">
          {props.friendsList.map((item: listType, index: number) => {
            return (
              <Row key={index}>
                <Col span={6}>
                  <img src={item.avator}></img>
                </Col>
                <Col span={6}>{item.name}</Col>
                <Col span={12} className={styles.throughout} onClick={props.throughoutLogs}>查看</Col>
              </Row>
            );
          })}
        </TabPane>
        <TabPane tab="群" key="2">
          {props.groupList.map((item: listType, index: number) => {
            return (
              <Row key={index}>
                <Col span={6}>
                  <img src={item.avator}></img>
                </Col>
                <Col span={6}>{item.name}</Col>
                <Col span={12} className={styles.throughout} onClick={props.throughoutLogs}>查看</Col>
              </Row>
            );
          })}
        </TabPane>
      </Tabs>
      ,
    </Modal>
  );
};
