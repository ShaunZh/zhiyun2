import React from 'react';
import { Select, Input } from 'antd';
const { Option } = Select;
import styles from './index.less';
const { Search } = Input;
export interface propsType {
  options: { label: string; value: string }[];
  handleChangeStatus: (value: string) => void;
  inputSearch:(value:string)=>void
}
//select+input
export default (props: propsType) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <span className="u-name">状态: </span>
        <Select
          placeholder="请选择状态"
          style={{
            width: 240,
            height: 34,
            marginRight: 20,
            marginLeft: 10,
          }}
          onChange={props.handleChangeStatus}
        >
          {props.options.map((item: { label: string; value: string }) => (
            <Option value={item.value} key={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      </div>
      <div>
        <Search
          placeholder="input search text"
          onSearch={props.inputSearch}
          style={{ width: 200 }}
          allowClear={true}
        />
      </div>
    </div>
  );
};
