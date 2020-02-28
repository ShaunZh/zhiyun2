import React from 'react';
import { Table, Row, Col } from 'antd';
import { ColumnProps } from 'antd/es/table';
import ResourceInModal from '@/components/ResourceInModal';

import styles from './index.less';

// 课件类型
enum ECoursewareType {
  ppt = 'ppt',
  pdf = 'pdf',
  word = 'word',
  video = 'video',
}

interface ICourseware {
  name: string; // 课件名称
  number: string;
  link: string; // 课件连接
  type: ECoursewareType; // 课件类型
}

interface ITableColumn {
  key: string;
  fileList: Array<ICourseware>; // 课件列表
  filesUrl: string; // 课程视频链接
}

interface ITableProps {
  loading: boolean;
  list: Array<ITableColumn> | [];
}

export default (props: ITableProps) => {
  const { loading, list } = props;

  const loadingConfig = {
    // 延时500毫秒展示loading，防止闪烁
    delay: 500,
    spinning: loading,
  };

  const initColumns: ColumnProps<ITableColumn>[] = [
    {
      title: '直播课件',
      dataIndex: 'courseware',
      key: 'courseware',
      render: (text: string, record: ITableColumn) => (
        <Row type="flex" justify="start">
          {record.fileList &&
            record.fileList.map(item => (
              <Col key={item.number} className={styles.col}>
                <ResourceInModal
                  name={item.name}
                  type={item.type}
                  link={item.link}
                ></ResourceInModal>
              </Col>
            ))}
        </Row>
      ),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: ITableColumn) => (
        <div className={styles.col}>
          <ResourceInModal name="查看视频" type="video" link={record.filesUrl}></ResourceInModal>
        </div>
      ),
    },
  ];

  const columns = initColumns;

  return (
    <div className={styles.container}>
      <Table
        loading={loadingConfig}
        columns={columns}
        rowKey="key"
        dataSource={list}
        rowClassName={() => `table-row-height`}
        pagination={false}
      />
    </div>
  );
};
