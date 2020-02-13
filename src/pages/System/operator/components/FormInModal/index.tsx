import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';

import styles from './index.less';

import operator from '@/services/system/operator';

const { Option } = Select;

export enum OperateType {
  CREATE,
  EDIT,
}

interface IUserFormProps extends FormComponentProps, IFormInModal {
  roleOptions: Array<React.ReactElement>;
}

interface IUserFormState {
  formInitial: {
    number: string;
    account: string;
    operator: string;
    mobile: string;
    role: string;
  };
}

interface IFormFieds {
  account: string;
  operator: string;
  mobile: string;
  role: string;
}

class UserForm extends React.Component<IUserFormProps, IUserFormState> {
  state: IUserFormState = {
    formInitial: {
      number: '',
      account: '',
      operator: '',
      mobile: '',
      role: '',
    },
  };

  componentDidMount() {
    if (this.props.number) {
      console.log('detail');
      this.fetchOperatorDetall(this.props.number);
    }
    console.log('user form did mount');
  }

  fetchOperatorDetall = async (number: string) => {
    const { result } = await operator.detail({ number });
    this.setState({
      formInitial: {
        ...result,
      },
    });
  };

  // 校验
  validatorMobile = (rule: string, value: string, callback: (e?: Error) => void) => {
    const mobileRex = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
    const newValue = value.replace(/\s+/g, '');
    if (newValue === '') {
      callback(new Error('请输入手机号码'));
    } else if (!mobileRex.test(newValue)) {
      callback(new Error('请输入正确的手机号码'));
    } else {
      callback();
    }
  };

  // 取消
  handleCancel = () => {
    const { form } = this.props;
    form.resetFields();
    this.props.handleResult('cancel');
    console.log('form cancel');
  };

  // 提交
  handleSubmit = () => {
    const { form, operateType } = this.props;
    form.validateFields(async (err: any, values: IFormFieds) => {
      if (err) {
        return;
      }
      try {
        if (operateType === OperateType.EDIT) {
          await operator.update({
            ...values,
            number: this.props.number as string,
          });
        } else {
          await operator.create(values);
        }
        form.resetFields();
        this.props.handleResult('success');
      } catch (e) {
        console.log('submit error: ', e.message);
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form layout="vertical">
          <Form.Item label="账号">
            {getFieldDecorator('account', {
              initialValue: this.state.formInitial.account,
              rules: [
                {
                  required: true,
                  message: '请输入账号',
                },
              ],
            })(<Input placeholder="请输入账号" />)}
          </Form.Item>
          <Form.Item label="用户名">
            {getFieldDecorator('operator', {
              initialValue: this.state.formInitial.operator,
              rules: [
                {
                  required: true,
                  message: '请输入用户名',
                },
              ],
            })(<Input placeholder="请输入用户名" />)}
          </Form.Item>
          <Form.Item label="手机号码">
            {getFieldDecorator('mobile', {
              initialValue: this.state.formInitial.mobile,
              rules: [
                {
                  required: true,
                  message: '请输入正确的手机号码',
                  pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
                },
              ],
              validateTrigger: 'onBlur',
            })(<Input placeholder="请输入手机号码" />)}
          </Form.Item>
          <Form.Item label="角色" className="collection-create-form_last-form-item">
            {getFieldDecorator('role', {
              initialValue: this.state.formInitial.role,
              rules: [
                {
                  required: true,
                  message: '请选择角色',
                },
              ],
            })(<Select placeholder="请选择角色">{this.props.roleOptions}</Select>)}
          </Form.Item>
        </Form>
        <div className={styles.btnWrap}>
          <Button onClick={this.handleCancel}>取消</Button>
          <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
            保存
          </Button>
        </div>
      </div>
    );
  }
}

const CreateForm = Form.create<IUserFormProps>({ name: 'form_in_modal' })(UserForm);

interface IFormInModal {
  number?: string;
  operateType: OperateType;
  visible: boolean;
  handleResult: (type: string) => void;
}

export default (props: IFormInModal) => {
  const [roleOptions, setRoleOptions] = useState<Array<React.ReactElement>>([]);
  // 获取角色: 因为角色列表不需要每次都获取，因此放在此处
  const fetchRoleOptions = async () => {
    const { result } = await operator.roleOptions();
    const options = result.map((item: ISelectOption) => (
      <Option key={item.value} value={item.value}>
        {item.label}
      </Option>
    ));
    setRoleOptions(options);
  };

  useEffect(() => {
    fetchRoleOptions();
  }, []);

  return (
    <Modal
      className={styles.container}
      footer={null}
      visible={props.visible}
      // 当modal关闭时，摧毁包裹的子组件
      destroyOnClose
      title={props.operateType === OperateType.CREATE ? '新增操作员' : '编辑操作员'}
    >
      <CreateForm {...props} roleOptions={roleOptions} />
    </Modal>
  );
};
