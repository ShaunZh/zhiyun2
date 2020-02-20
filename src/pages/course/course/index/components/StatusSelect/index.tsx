import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface Props {
  handleChange: (v: string) => void;
}

const StatusSelect: React.FC<Props> = props => {
  const options: Array<ISelectOption> = [
    { label: '启用', value: 'Y' },
    { label: '禁用', value: 'N' },
  ];

  return (
    <div style={{ display: 'inline-block' }}>
      <span className="u-name">课程状态: </span>
      <Select
        placeholder="请选择状态"
        style={{
          width: 200,
          height: 34,
          marginRight: 20,
          marginLeft: 10,
        }}
        onChange={props.handleChange}
        key="course-status-select"
      >
        {options.map((item: ISelectOption) => (
          <Option value={item.value} key={`course-status-select-${item.value}`}>
            {item.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default StatusSelect;
