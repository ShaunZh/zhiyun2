import React, { useState, useEffect } from 'react';
import { Select } from 'antd';

import courseApi from '@/services/course/course';

const { Option } = Select;

interface Props {
  handleChange: (v: string) => void;
}

const StatusSelect: React.FC<Props> = props => {
  const [options, setOptions] = useState<Array<ISelectOption>>([]);
  const fetchStatusOptions = async () => {
    const { result } = await courseApi.categoriesList();
    setOptions(result);
  };

  useEffect(() => {
    fetchStatusOptions();
  }, []);
  return (
    <div style={{ display: 'inline-block' }}>
      <span className="u-name">课程分类: </span>
      <Select
        placeholder="请选择课程分类"
        style={{
          width: 200,
          height: 34,
          marginRight: 20,
          marginLeft: 10,
        }}
        onChange={props.handleChange}
        key="course-category-select"
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
