import React from 'react';
import styles from './index.less';
import { Row, Col } from 'antd';
import LogoIcon from '@/assets/lodingpage-logo.png';
import Picture from '@/assets/left-bg.png';
import LoginForm from './components/LoginForm'
export default class DengLu extends React.Component<{}, {}> {
  render() {
    return (
      <div className={styles.box}>
        <Row className={styles.icon}>
          <img src={LogoIcon}></img>
        </Row>
        <Row type="flex" justify="space-between" className={styles.loginBox}>
          <Col span={12} className={styles.pictureBox}>
            <img src={Picture} className={styles.picture}></img>
          </Col>
          <Col span={12} className={styles.formBox}>
            <div className={styles.form}>
                <div className={styles.title}>用户登录</div>
                <LoginForm></LoginForm>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
