import React from 'react';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';

interface IProps {
  radiosList: Array<ISelectOption>;
  handleChange: (v: string) => void;
}

const Radios: React.FC<IProps> = props => {
  const radiosButton = props.radiosList.map(item => (
    <Radio.Button value={item.value} key={item.label}>
      {item.label}
    </Radio.Button>
  ));
  const handleChange = (e: RadioChangeEvent) => {
    props.handleChange(e.target.value);
  };

  return (
    <Radio.Group defaultValue="a" buttonStyle="solid" onChange={handleChange}>
      {radiosButton}
    </Radio.Group>
  );
};

export default Radios;
