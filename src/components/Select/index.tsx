import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface Props {
  options: Array<ISelectOption>;
  value: string;
  placeholder: string;
  handleChange: (v: string) => void;
  label?: string;
}

const StatusSelect: React.FC<Props> = props => {
  const { options, value, placeholder, label = '', handleChange } = props;
  return (
    <div style={{ display: 'inline-block' }}>
      <span className="u-name">{label} </span>
      <Select
        placeholder={placeholder}
        style={{
          width: 200,
          height: 34,
          marginRight: 20,
          marginLeft: 10,
        }}
        onChange={handleChange}
        key="course-category-select"
        defaultValue={value}
        value={value}
      >
        {options.map((item: ISelectOption) => (
          <Option value={item.value} key={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default StatusSelect;
