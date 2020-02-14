import React, { useState, useEffect } from 'react';
import { Select } from 'antd';

import operator from '@/services/system/operator';

const { Option } = Select;

interface Props {
  handleChangeStatus: (v: string) => void;
}

const StatusSelect: React.FC<Props> = props => {
  const [options, setOptions] = useState<Array<ISelectOption>>([]);
  const fetchStatusOptions = async () => {
    const { result } = await operator.statusOptions();
    setOptions(result);
  };

  useEffect(() => {
    fetchStatusOptions();
  }, []);
  return (
    <div style={{ display: 'inline-block' }}>
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
