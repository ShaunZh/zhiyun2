import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';

import styles from './index.less';

import categoryApi from '../../service';

export enum OperateType {
  create,
  edit,
}

interface IUserFormProps extends FormComponentProps, IFormInModal {
  number?: string;
}

interface IUserFormState {
  formInitial: {
    categoryName: string;
  };
  submitting: boolean;
}

interface IFormFieds {
  categoryName: string;
}

class UserForm extends React.Component<IUserFormProps, IUserFormState> {
  state: IUserFormState = {
    formInitial: {
      categoryName: '',
    },
    submitting: false,
  };

  componentDidMount() {
    if (this.props.number) {
      this.fetchOperatorDetail(this.props.number);
    }
  }

  fetchOperatorDetail = async (number: string) => {
    const { result } = await categoryApi.detail({ number });
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
          await categoryApi.update({
            ...values,
            number: this.props.number as string,
          });
        } else {
          await categoryApi.create(values);
        }
        this.setState({
          submitting: false,
        });
        form.resetFields();
        this.props.handleResult('success');
      } catch (e) {
        console.error('error: ', e.message);
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
          <Form.Item label="分类名称">
            {getFieldDecorator('categoryName', {
              initialValue: this.state.formInitial.categoryName,
              rules: [
                {
                  required: true,
                  message: '请输入分类名称',
                },
              ],
            })(<Input placeholder="请输入分类名称" />)}
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

const CreateForm = Form.create<IUserFormProps>({ name: 'form_in_modal' })(UserForm);

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
    title={props.operateType === OperateType.create ? '新增分类' : '编辑分类'}
    onCancel={() => props.handleResult('cancel')}
  >
    <CreateForm {...props} />
  </Modal>
);
