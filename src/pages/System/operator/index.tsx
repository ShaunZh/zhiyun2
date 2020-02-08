import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Select, Button, Input, Row, Col } from 'antd';
import styles from './index.less';
import TableBasic from './components/TableBasic';

const { Option } = Select;
const { Search } = Input;

export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  const handleChange = (e: string) => {
    console.log('e', e);
  };
  return (
    <PageHeaderWrapper className={styles.main}>
      <Row className="header" type="flex" align="middle" justify="space-between">
        <Col className="left">
          <span className="u-name">息状态: </span>
          <Select
            defaultValue="lucy"
            style={{ width: 240, height: 34, marginRight: 20, marginLeft: 10 }}
            onChange={handleChange}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </Select>
          <Button type="primary">新增操作员</Button>
        </Col>
        <Col className="right">
          <Search
            placeholder="输入搜索内容"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
        </Col>
      </Row>
      <div
        style={{
          paddingTop: 30,
          textAlign: 'center',
        }}
      >
        <Spin spinning={loading} size="large"></Spin>
      </div>
      <TableBasic />
    </PageHeaderWrapper>
  );
};
