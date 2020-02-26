import React from 'react';
import styles from './index.less';
import { Pagination } from 'antd';
interface propsType {
  curPage: number;
  totalItems: number;
  changePage: (pageNumber: number) => void;
  changeSize:(current:number,size:number)=>void
}
export default (props: propsType) => {
  return (
    <Pagination
      showQuickJumper
      defaultCurrent={props.curPage}
      total={props.totalItems}
      onChange={props.changePage}
      showSizeChanger
      onShowSizeChange={props.changeSize}
      className={styles.pagination}
    />
  );
};
