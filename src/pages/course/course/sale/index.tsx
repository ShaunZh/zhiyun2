import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less';

import Join from './components/Join';
import Course from './components/Course';

export default () => (
  <PageHeaderWrapper className={styles.container}>
    <Course courseNumber="12212"></Course>
    <Join courseNumber="121212"></Join>
  </PageHeaderWrapper>
);
