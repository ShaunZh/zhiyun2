import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

const { Search } = Input;

interface Props {
  value: string;
  placeholder: string;
  handleSearch: (v: string) => void;
}

const SearchCom: React.FC<Props> = (props: Props) => {
  const [value, setValue] = useState<string>(props.value);
  const fetch = (v: string) => {
    props.handleSearch(v);
  };
  const handleSearch = debounce(fetch, 500);
  const handleChange = (v: React.ChangeEvent<HTMLInputElement>) => setValue(v.target.value);

  useEffect(() => {
    // 此处是为了解决：当父组件传入的value发生变化时，及时将其值设置到本地的value中
    setValue(props.value);
  }, [props.value]);

  return (
    <Search
      placeholder={props.placeholder}
      onSearch={handleSearch}
      onChange={handleChange}
      value={value}
      allowClear
      style={{
        width: 200,
      }}
    />
  );
};

export default SearchCom;
