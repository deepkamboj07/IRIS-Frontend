import React from 'react';
import { Modal, Form, Input } from 'antd';
import { useProjectStore } from '../../store/useProjectStore';

interface RegisterProjectModalProps {
  isOpen: boolean;
    close: () => void;
}

const RegisterProjectModal: React.FC<RegisterProjectModalProps> = ({ isOpen, close }) => {
  const [form] = Form.useForm();
  const { createProject, loading } = useProjectStore();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await createProject(values);
      form.resetFields();
      close();
    } catch (err) {
      console.error('Validation failed:', err);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    close();
  };

  return (
    <Modal
      title="Register New Project"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Create"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical" name="register_project_form">
        <Form.Item
          label="Project Name"
          name="name"
          rules={[{ required: true, message: 'Please enter a project name' }]}
        >
          <Input placeholder="e.g. Inventory Management System" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea
            placeholder="Optional project description"
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegisterProjectModal;
