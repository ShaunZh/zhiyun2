import React from 'react';
import { Modal, List, Avatar } from 'antd';
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
      <List
        itemLayout="horizontal"
        dataSource={props.friendsData}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src={item.avator} />
              }
              title={<a href="https://ant.design">{item.name}</a>}
             
            />
          </List.Item>
        )}
      />
      ,
    </Modal>
  );
};
