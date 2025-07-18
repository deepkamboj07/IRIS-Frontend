import React  from 'react';
import { Button, Form, Input, Modal, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProjectTaskDTO) => Promise<void>;
  projectId: string;
}

export type CreateProjectTaskDTO = {
  title: string;
  description?: string;
  projectId: string;
  taskList?: {
    detail: string;
  }[];
};

const TaskModal: React.FC<TaskModalProps> = ({ visible, onClose, onSubmit, projectId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const handleFinish = async(values: any) => {
    setLoading(true);
    const payload: CreateProjectTaskDTO = {
      title: values.title,
      description: values.description,
      projectId,
      taskList: values.taskList?.map((item: any) => ({ detail: item.detail })) || [],
    };
    await onSubmit(payload);
    form.resetFields();
    onClose();
    setLoading(false);
  };

  return (
    <Modal
      title="Create New Task"
      open={visible}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      confirmLoading={loading}
      onOk={() => form.submit()}
      okText="Create"
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="title"
          label="Task Title"
          rules={[{ required: true, message: 'Please enter a task title' }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Optional task description" />
        </Form.Item>

        <Form.List name="taskList">
          {(fields, { add, remove }) => (
            <>
              <div className='mb-4'>
                <label className="font-medium">Checklist / Sub-tasks</label>
              </div>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} className="flex w-full" align="start">
                  <Form.Item
                    {...restField}
                    name={[name, 'detail']}  
                    rules={[{ required: true, message: 'Sub-task cannot be empty' }]}
                  >
                    <Input placeholder="Sub-task detail" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} className="text-red-500" />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  block
                >
                  Add Sub-task
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default TaskModal;
