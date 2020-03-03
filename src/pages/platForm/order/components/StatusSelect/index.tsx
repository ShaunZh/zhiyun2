import React from 'react';
import { Select, Row, Col, Input } from 'antd';
import styles from './index.less';
const { Option } = Select;
const { Search } = Input;
interface propsType {
  firstHandleChange: (value: string) => void;
  secondHandleChange: (value: string) => void;
  searchValue: (value: string) => void;
}
export default (props: propsType) => {
  return (
    <div className={styles.row}>
      <Row>
        <Col span={6}>
          <span>订单状态：</span>
          <Select defaultValue="lucy" style={{ width: 120 }} onChange={props.firstHandleChange} className={styles.select}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Col>
        <Col span={6}>
          <span>所属网校：</span>
          <Select defaultValue="lucy" style={{ width: 120 }} onChange={props.secondHandleChange} className={styles.select}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Col>
        <Col span={12} className={styles.col}>
          <Search
            placeholder="input search text"
            onSearch={props.searchValue}
            style={{ width: 200 }}
          />
        </Col>
      </Row>
    </div>
  );
};
