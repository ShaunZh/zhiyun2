import React from 'react';
import { Row, Col, Select, Input } from 'antd';
import styles from './index.less';
const { Option } = Select;
const { Search } = Input;
interface propsType {
  identitySelect: (value: string) => void;
  statusSelect: (value: string) => void;
  handleSearch:(value: string) => void
}
export default (props: propsType) => {
  return (
    <div>
      <Row type="flex" justify="space-between">
        <Col span={12}>
          <Row>
            <Col span={12}>
              用户身份：
              <Select
                placeholder="请选择用户身份"
                onChange={props.identitySelect}
                style={{
                  width: 240,
                  height: 34,
                  marginRight: 20,
                  marginLeft: 10,
                }}
              >
                <Option value="china">China</Option>
                <Option value="usa">U.S.A</Option>
              </Select>
              ,
            </Col>
            <Col span={12}>
              用户状态：
              <Select
                placeholder="请选择用户状态"
                onChange={props.statusSelect}
                style={{
                  width: 240,
                  height: 34,
                  marginRight: 20,
                  marginLeft: 10,
                }}
              >
                <Option value="china">China</Option>
                <Option value="usa">U.S.A</Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={10} className={styles.search}>
          <Search
            placeholder="input search text"
            onSearch={props.handleSearch}
            style={{ width: 200 }}
          />
        </Col>
      </Row>
    </div>
  );
};
