import React, { useState } from 'react';
import { Modal } from 'antd';

interface IProps {
  name: string; // 资源名称
  type: string; // 资源类型
  link: string; // 资源链接
  className?: string;
}

const ResourceInModal: React.FC<IProps> = (props: IProps) => {
  const { name, type, link, className } = props;
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div className={className}>
      <span onClick={() => setVisible(true)}>{name}</span>
      <Modal
        footer={null}
        visible={visible}
        // 当modal关闭时，摧毁包裹的子组件
        destroyOnClose
        title={name}
        onCancel={() => setVisible(false)}
      >
        <p>{name}</p>
        <p>{type}</p>
        <p>{link}</p>
      </Modal>
    </div>
  );
};

export default ResourceInModal;
