import React from 'react';
import { Modal, Tabs, List, Avatar } from 'antd';
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
  throughoutLogs: (item: listType) => void;
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
          <List
            itemLayout="horizontal"
            dataSource={props.friendsList}
            renderItem={item => (
              <List.Item
                actions={[
                  <a
                    key="list-loadmore-edit"
                    onClick={() => {
                      props.throughoutLogs(item);
                    }}
                  >
                    查看
                  </a>,
                ]}
              >
                <List.Item.Meta avatar={<Avatar src={item.avator} />} title={item.name} />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="群" key="2">
          <List
            itemLayout="horizontal"
            dataSource={props.groupList}
            renderItem={item => (
              <List.Item
                actions={[
                  <a
                    key="list-loadmore-edit"
                    onClick={() => {
                      props.throughoutLogs(item);
                    }}
                  >
                    查看
                  </a>,
                ]}
              >
                <List.Item.Meta avatar={<Avatar src={item.avator} />} title={item.name} />
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
      ,
    </Modal>
  );
};
