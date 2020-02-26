import React from 'react';
import { Tabs, Button } from 'antd';
const { TabPane } = Tabs;
import styles from './index.less';
interface propsType {
  spankey: string;
  clickDate: () => void;
  clickWeek: () => void;
  clickMonth: () => void;
}

export default (props: propsType) => {
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        tabBarExtraContent={
          <span>
            <span
              className={props.spankey === 'date' ? styles.activespan : styles.span}
              onClick={props.clickDate}
            >
              日
            </span>
            <span
              className={props.spankey === 'week' ? styles.activespan : styles.span}
              onClick={props.clickWeek}
            >
              周
            </span>
            <span
              className={props.spankey === 'month' ? styles.activespan : styles.span}
              onClick={props.clickMonth}
            >
              月
            </span>
            <Button>下载</Button>
          </span>
        }
      >
        <TabPane tab="活跃用户数" key="1" forceRender={true}>
          <div id="main" className={styles.box}></div>
        </TabPane>
        <TabPane tab="付费用户数" key="2" forceRender={true}>
          <div id="main1" className={styles.box}></div>
        </TabPane>
      </Tabs>
    </div>
  );
};
