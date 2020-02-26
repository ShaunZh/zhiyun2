import React from 'react';
import { Modal, Input, TreeSelect } from 'antd';
import styles from './index.less';
const { SHOW_PARENT } = TreeSelect;

interface modalProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  treeData:
    | {
        title: string;
        value: string;
        key: string;
        children?: {
          title: string;
          value: string;
          key: string;
        }[];
      }[]
    | [];
  value: string[] | [];
  selectNode: (value: string[]) => void;
  changeInputValue: (e: any) => void;
  inputValue: string;
}
export default (props: modalProps) => {
  const tProps = {
    treeData: props.treeData,
    value: props.value,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    searchPlaceholder: '点击搜索框选择权限',
    // treeDefaultExpandAll: true,
    style: {
      width: '100%',
    },
  };
  return (
    <div>
      <Modal
        title="角色管理/新增角色"
        visible={props.visible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
      >
        <div>
          <Input
            placeholder="请输入角色名"
            onChange={props.changeInputValue}
            value={props.inputValue}
          />
        </div>
        <div className={styles.treeSelect}>
          <TreeSelect
            {...tProps}
            onChange={props.selectNode}
          />
        </div>
      </Modal>
    </div>
  );
};
