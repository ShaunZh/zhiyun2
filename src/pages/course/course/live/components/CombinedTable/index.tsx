import React from 'react';

import CoursewareTable from '../CoursewareTable';
import DiscussTable from '../DiscussTable';
import StaffTable from '../StaffTable';

interface IProps {
  loading: boolean;
  type: string;
  list: Array<any>;
}

const CombinedTable: React.FC<IProps> = (props: IProps) => {
  const { type } = props;
  let myTable: React.ReactNode;

  if (type === '0' || type === '1' || type === '2' || type === '3') {
    myTable = <StaffTable {...props}></StaffTable>;
  } else if (type === '4') {
    myTable = <CoursewareTable {...props}></CoursewareTable>;
  } else if (type === '5') {
    myTable = <DiscussTable {...props}></DiscussTable>;
  }

  return <div>{myTable}</div>;
};

export default CombinedTable;
