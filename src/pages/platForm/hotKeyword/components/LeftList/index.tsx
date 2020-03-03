import React from 'react';
import { List } from 'antd';
import iconEdit from '@/assets/icon-edit.png';
import iconDel from '@/assets/icon-del.png';
import styles from './index.less';
interface propsType {
  data: Array<string>;
  editKeyword: (item: string) => void;
  deleteKeyword: (itemValue: string) => void;
}
export default (props: propsType) => {
  return (
    <div>
      <List
        className={styles.list}
        itemLayout="horizontal"
        dataSource={props.data}
        renderItem={item => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit">
                <img
                  src={iconEdit}
                  className={styles.image}
                  onClick={() => {
                    props.editKeyword(item);
                  }}
                ></img>
              </a>,
              <a key="list-loadmore-more">
                <img
                  src={iconDel}
                  className={styles.image}
                  onClick={() => {
                    props.deleteKeyword(item);
                  }}
                ></img>
              </a>,
            ]}
            key={item}
          >
            <List.Item.Meta title={<a href="https://ant.design">{item}</a>} />
          </List.Item>
        )}
      />
    </div>
  );
};
