import React, { useState, useEffect } from 'react';

import TableBasic, { ITableColumn } from './TableBasic';
import styles from './index.less';

import saleApi from '../../service';

interface IProps {
  courseNumber: string;
}

export default (props: IProps) => {
  const { courseNumber } = props;
  const [list, setList] = useState<Array<ITableColumn>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchList = async () => {
    setLoading(true);
    const {
      result: { data },
    } = await saleApi.courseDetail({ courseNumber });
    setList([data]);
    setLoading(false);
  };

  const handleActionEnable = async (index: number) => {
    await saleApi.updateStatus({ courseNumber: list[index].number });

    const newStatus = list[index].status === 'Y' ? 'N' : 'Y';
    list[index].status = newStatus;
    // TODO: 确认这种写法是否对性能有影响，因为，如果只是更改list中某个对象元素的值是无法让TableBasic组件重新渲染
    setList([...list]);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>报名信息</h3>
      <TableBasic
        list={list}
        loading={loading}
        handleActionEnable={handleActionEnable}
      ></TableBasic>
    </div>
  );
};
