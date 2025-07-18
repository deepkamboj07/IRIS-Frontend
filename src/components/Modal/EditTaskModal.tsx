import React, { useState } from 'react';
import { Modal, Input, Select, Checkbox,  Divider, message } from 'antd';
import type { TaskType } from '../../store/useProjectStore';

const { TextArea } = Input;
const { Option } = Select;

interface EditTaskModalProps {
  open: boolean;
  onClose: () => void;
  task: TaskType;
  onSave: (updatedTask: TaskType) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ open, onClose, task, onSave }) => {
  const [editedTask, setEditedTask] = useState<TaskType>(task);

  const handleInputChange = (field: keyof TaskType, value: string) => {
    setEditedTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleTaskListChange = (index: number, value: string) => {
    const updatedList = [...(editedTask.taskLists || [])];
    updatedList[index].detail = value;
    setEditedTask((prev) => ({ ...prev, taskLists: updatedList }));
  };

  const toggleTaskListStatus = (index: number) => {
    const updatedList = [...(editedTask.taskLists || [])];
    updatedList[index].status = updatedList[index].status === 'completed' ? 'pending' : 'completed';
    setEditedTask((prev) => ({ ...prev, taskLists: updatedList }));
  };

  const handleStatusChange = (status: TaskType['status']) => {
    setEditedTask((prev) => ({ ...prev, status }));
  };

  const handleSave = () => {
    onSave(editedTask);
    message.success('Task updated successfully');
    onClose();
  };

  return (
    <Modal
      title="Edit Task"
      open={open}
      onCancel={onClose}
      onOk={handleSave}
      okText="Save"
    >
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Task Title"
          value={editedTask.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
        />
        <TextArea
          placeholder="Description"
          rows={3}
          value={editedTask.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
        />
        <Select
          value={editedTask.status}
          onChange={handleStatusChange}
          className="w-full"
        >
          <Option value="pending">Pending</Option>
          <Option value="inProgress">In Progress</Option>
          <Option value="inReview">In Review</Option>
          <Option value="completed">Completed</Option>
        </Select>

        {         editedTask.taskLists && editedTask.taskLists.length > 0 && (
          <Divider orientation="left">Subtasks</Divider>
        )}
        {(editedTask.taskLists || []).map((listItem, index) => (
          <div key={listItem.id || index} className="flex items-center gap-2">
            <Checkbox
              checked={listItem.status === 'completed'}
              onChange={() => toggleTaskListStatus(index)}
            />
            <Input
              value={listItem.detail}
              onChange={(e) => handleTaskListChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default EditTaskModal;
