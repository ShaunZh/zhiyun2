import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';

import styles from './index.less';

import messageApi from '@/services/system/message';

export enum OperateType {
  create,
  edit,
}
const { TextArea } = Input;

interface IUserFormProps extends FormComponentProps, IFormInModal {}

interface IUserFormState {
  formInitial: {
    number: string;
    title: string;
    content: string;
  };
  submitting: boolean;
}

interface IFormFieds {
  title: string;
  content: string;
}

class UserForm extends React.Component<IUserFormProps, IUserFormState> {
  state: IUserFormState = {
    formInitial: {
      number: '',
      title: '',
      content: '',
    },
    submitting: false,
  };

  componentDidMount() {
    if (this.props.number) {
      this.fetchMessageDetail(this.props.number);
    }
  }

  fetchMessageDetail = async (number: string) => {
    const { result } = await messageApi.detail({ number });
    this.setState({
      formInitial: {
        ...result,
      },
    });
  };

  // 取消
  handleCancel = () => {
    const { form } = this.props;
    form.resetFields();
    this.props.handleResult('cancel');
  };

  // 提交
  handleSubmit = () => {
    const { form, operateType } = this.props;
    form.validateFields(async (err: any, values: IFormFieds) => {
      if (err) {
        return;
      }
      try {
        // 防重复提交
        await this.setState({
          submitting: true,
        });
        if (operateType === OperateType.edit) {
          await messageApi.update({
            ...values,
            number: this.props.number as string,
          });
        } else {
          await messageApi.create(values);
        }
        this.setState({
          submitting: false,
        });
        form.resetFields();
        this.props.handleResult('success');
      } catch (e) {
        this.setState({
          submitting: false,
        });
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form layout="vertical">
          <Form.Item label="消息标题">
            {getFieldDecorator('title', {
              initialValue: this.state.formInitial.title,
              rules: [
                {
                  required: true,
                  message: '请输入消息标题',
                },
              ],
            })(<Input placeholder="请输入消息标题" />)}
          </Form.Item>
          <Form.Item label="消息内容">
            {getFieldDecorator('operator', {
              initialValue: this.state.formInitial.content,
              rules: [
                {
                  required: true,
                  message: '请输入消息内容',
                },
              ],
            })(<TextArea placeholder="请输入消息内容" />)}
          </Form.Item>
        </Form>
        <div className={styles.btnWrap}>
          <Button onClick={this.handleCancel}>取消</Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={this.handleSubmit}
            loading={this.state.submitting}
          >
            保存
          </Button>
        </div>
      </div>
    );
  }
}

const CreateForm = Form.create<IUserFormProps>({ name: 'message_form_in_modal' })(UserForm);

interface IFormInModal {
  number?: string;
  operateType: OperateType;
  visible: boolean;
  handleResult: (type: string) => void;
}

export default (props: IFormInModal) => (
  <Modal
    className={styles.container}
    footer={null}
    visible={props.visible}
    // 当modal关闭时，摧毁包裹的子组件
    destroyOnClose
    title={props.operateType === OperateType.create ? '新增消息' : '编辑消息'}
    onCancel={() => props.handleResult('cancel')}
  >
    <CreateForm {...props} />
  </Modal>
);
