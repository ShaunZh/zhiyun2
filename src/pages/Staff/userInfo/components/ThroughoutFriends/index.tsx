import React from 'react';
import { Modal, Row, Col } from 'antd';
export interface friendsDataType {
  avator: string;
  name: string;
}
interface propsType {
  throughoutFriendsVisible: boolean;
  throughoutFriendsHandleCancel: () => void;
  friendsData: Array<friendsDataType>;
}
export default (props: propsType) => {
  return (
    <Modal
      visible={props.throughoutFriendsVisible}
      title="
      人员管理/用户信息管理/查看好友
      "
      onCancel={props.throughoutFriendsHandleCancel}
      footer={null}
    >
      <div>
        {props.friendsData.map((item: friendsDataType, index: number) => {
          return (
            <Row key={index}>
              <Col span={6}>
                <img src={item.avator}></img>
              </Col>
              <Col span={6}>{item.name}</Col>
            </Row>
          );
        })}
      </div>
    </Modal>
  );
};
