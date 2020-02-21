import React from 'react';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';
import styles from './index.less';

interface IProps {
  defaultValue: string;
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
    <div className="com-radios">
      <span className={styles.label}>人员分类</span>
      <Radio.Group
        defaultValue={props.defaultValue}
        buttonStyle="solid"
        onChange={handleChange}
        className={styles.radios}
      >
        {radiosButton}
      </Radio.Group>
    </div>
  );
};

export default Radios;
