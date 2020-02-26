import React from 'react';
import { Modal, Row, Col } from 'antd';
import styles from './index.less'
interface propsType {
  userInfoVisible: boolean;
  userInfo:userInfoType;
  userInfoHandleCancel: () => void;
}
export interface userInfoType {
  avator: string;
  nickName: string;
  ID: string;
  sex: string;
  tel: string;
  email: string;
  area: string;
  sign: string;
  QRCode: string;
}
export default (props: propsType) => {
  return (
    <div>
      <Modal
        visible={props.userInfoVisible}
        title="
        人员管理/用户信息管理/查看用户详情
        "
        onCancel={props.userInfoHandleCancel}
        footer={null}
      >
        <Row className={styles.row}>
          <Col span={6} className={styles.left}>头像：</Col>
          <Col span={18}><img src={props.userInfo.avator}></img></Col>
        </Row>
        <Row className={styles.row}>
          <Col span={6} className={styles.left}>昵称：</Col>
          <Col span={18}>{props.userInfo.nickName}</Col>
        </Row>
        <Row className={styles.row}>
          <Col span={6} className={styles.left}>ID：</Col>
          <Col span={18}>{props.userInfo.ID}</Col>
        </Row>
        <Row className={styles.row}>
          <Col span={6} className={styles.left}>性别：</Col>
          <Col span={18}>{props.userInfo.sex}</Col>
        </Row>
        <Row className={styles.row}>
          <Col span={6} className={styles.left}>手机号码：</Col>
          <Col span={18}>{props.userInfo.tel}</Col>
        </Row>
        <Row className={styles.row}>
          <Col span={6} className={styles.left}>邮箱地址：</Col>
          <Col span={18}>{props.userInfo.email}</Col>
        </Row>
        <Row className={styles.row}>
          <Col span={6} className={styles.left}>地区：</Col>
          <Col span={18}>{props.userInfo.area}</Col>
        </Row>
        <Row className={styles.row}>
          <Col span={6} className={styles.left}>个性签名：</Col>
          <Col span={18}>{props.userInfo.sign}</Col>
        </Row>
        <Row className={styles.row}>
          <Col span={6} className={styles.left}>二维码：</Col>
          <Col span={18}><img src={props.userInfo.QRCode}></img></Col>
        </Row>
      </Modal>
    </div>
  );
};
