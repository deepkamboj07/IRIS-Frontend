import React from 'react';
import { Modal, Form, Input, Select } from 'antd';

interface EditCardModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
  fields: {
    name: string;
    label: string;
    placeholder?: string;
    type?: 'text' | 'select';
    options?: string[]; // for select
  }[];
  initialValues?: Record<string, any>;
  title: string;
  loading?: boolean;
}

export const EditCardModal: React.FC<EditCardModalProps> = ({
  open,
  onClose,
  onSave,
  fields,
  initialValues = {},
  title,
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSave(values);
      onClose();
    } catch (error) {
      console.log('Validation Failed:', error);
    }
  };

  return (
    <Modal open={open} onCancel={onClose} onOk={handleOk}
      title={title} >
      <Form layout="vertical" form={form} initialValues={initialValues}>
        {fields.map(field => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={[{ required: false }]}
          >
            {field.type === 'select' ? (
              <Select
                mode="tags"
                placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
              >
                {field.options?.map(option => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            ) : (
              <Input placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`} />
            )}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};
