import React from 'react';
import { Modal, Row, Col, Divider } from 'antd';
import styles from './index.less';
interface propsType {
  visible: boolean;
  handleCancel: () => void;
}
export default (props: propsType) => {
  return (
    <Modal visible={props.visible} title="课程信息" onCancel={props.handleCancel} footer={null}>
      <div className={styles.box}>
        <h2>基础信息</h2>
        <Row className={styles.row}>
          <span>课程封面</span>
          <span></span>
        </Row>
        <Row className={styles.row}>
          <span>课程名称</span>
          <span></span>
        </Row>
        <Row className={styles.row}>
          <span>课程简介</span>
          <span></span>
        </Row>
        <Row className={styles.row}>
          <span>课程分类</span>
          <span></span>
        </Row>
        <Row className={styles.row}>
          <span>课程标签</span>
          <span></span>
        </Row>
        <Row className={styles.row}>
          <span>二维码</span>
          <span></span>
        </Row>
        <Row className={styles.row}>
          <span>链接</span>
          <span></span>
        </Row>
      </div>
      <Divider />
      <div className={styles.box}>
        <h2>权限安全信息</h2>
        <Row className={styles.row}>
          <span>视频下载权限</span>
          <span>1214</span>
        </Row>
        <Row className={styles.row}>
          <span>准入权限</span>
          <span>ewrwee</span>
        </Row>
        <Row className={styles.row}>
          <span>人脸识别</span>
          <span></span>
        </Row>
        <Row className={styles.row}>
          <span>水印设置</span>
          <span></span>
        </Row>
        <Row className={styles.row}>
          <span>水印大小</span>
          <span></span>
        </Row>
        <Row className={styles.row}>
          <span>水印透明度</span>
          <span></span>
        </Row>
        <Row className={styles.row}>
          <span>水印时隔时间</span>
          <span></span>
        </Row>
        <Row className={styles.row}>
          <span>水印内容</span>
          <span></span>
        </Row>
      </div>
    </Modal>
  );
};
