import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';

import CombinedTable from '../CombinedTable';
import Radios from '@/components/Radios';

import { liveInfoByType } from '../../service';

import { IMasterAdmin } from '../../data.d';
import styles from './index.less';

interface IProps {
  courseNumber: string;
  courseName: string;

  tAdminData: Array<IMasterAdmin>;
  liveStartTime: string;
  liveEndTime: string;
}

const radiosList = [
  {
    label: '总管理员',
    value: '0',
  },
  {
    label: '管理员',
    value: '1',
  },
  {
    label: '教师',
    value: '2',
  },
  {
    label: '学员',
    value: '3',
  },
  {
    label: '课件',
    value: '4',
  },
  {
    label: '提问&讨论',
    value: '5',
  },
];

const LiveBlock: React.FC<IProps> = (props: IProps) => {
  const { courseName, courseNumber, liveStartTime, liveEndTime, tAdminData } = props;
  // eslint-disable-next-line dot-notation
  const [type, setType] = useState<string>('0');
  const [list, setList] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = async (param: string) => {
    try {
      setLoading(false);
      const { result } = await liveInfoByType({
        data: {
          type,
          courseNumber,
        },
        page: {
          pageNumbers: 1,
          countPerPages: 20,
        },
      });
      setType(param);
      setList(result.data);
      setLoading(false);
    } catch (e) {
      console.error('error: ', e.message);
      setLoading(false);
    }
  };

  const handleChangeRadio = (value: string) => {
    fetchData(value);
  };
  useEffect(() => {
    setList(tAdminData);
  }, []);

  return (
    <div className={styles.container}>
      <Row className={styles.header} type="flex" justify="space-between">
        <Col>
          <span className={styles.title}>{courseName}</span>
          <span className={styles.date}>{`${liveStartTime} ~ ${liveEndTime}`}</span>
        </Col>
        <Col>
          <Radios
            radiosList={radiosList}
            defaultValue={type}
            handleChange={handleChangeRadio}
          ></Radios>
        </Col>
      </Row>
      <CombinedTable list={list} type={type} loading={loading}></CombinedTable>
    </div>
  );
};

export default LiveBlock;
