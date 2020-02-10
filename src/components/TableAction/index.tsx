import React from 'react';
import styles from './index.less';

interface ITableActionProps {
  iconSrc: string; // 图标地址
  hoverTip: string; // 图标hover提示
  handleClick: () => void;
}

const TableAction: React.FC<ITableActionProps> = props => {
  const { iconSrc, hoverTip, handleClick } = props;

  const onHandleClick = () => {
    handleClick();
  };

  return (
    <div className={styles.action} onClick={onHandleClick}>
      <i className={styles.icon} style={{ backgroundImage: `url(${iconSrc})` }}></i>
      <span className={`${styles.tip}`}>{hoverTip}</span>
    </div>
  );
};

export default TableAction;
