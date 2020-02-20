import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface Props {
  handleChange: (v: string) => void;
}

const StatusSelect: React.FC<Props> = props => {
  const options: Array<ISelectOption> = [
    { label: '是', value: 'Y' },
    { label: '否', value: 'N' },
  ];
  return (
    <div style={{ display: 'inline-block' }}>
      <span className="u-name">是否上架到平台: </span>
      <Select
        placeholder="请选择状态"
        style={{
          width: 200,
          height: 34,
          marginRight: 20,
          marginLeft: 10,
        }}
        onChange={props.handleChange}
        key="course-up-select"
      >
        {options.map((item: ISelectOption) => (
          <Option value={item.value} key={`course-up-select-${item.value}`}>
            {item.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default StatusSelect;
