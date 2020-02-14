import React from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

const { Search } = Input;

interface Props {
  placeholder: string;
  handleSearch: (v: string) => void;
}

const SearchCom: React.FC<Props> = (props: Props) => {
  const fetch = (v: string) => {
    props.handleSearch(v);
  };
  const handleSearch = debounce(fetch, 500);

  return (
    <Search
      placeholder={props.placeholder}
      onSearch={handleSearch}
      allowClear
      style={{
        width: 200,
      }}
    />
  );
};

export default SearchCom;
