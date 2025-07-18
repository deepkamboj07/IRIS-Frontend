
import {  CheckSquareOutlined } from "@ant-design/icons";
import { Card } from "../../../Wrapper/Card";
import { useProjectStore, type TaskType } from "../../../store/useProjectStore";
import EditTaskModal from "../../Modal/EditTaskModal";
import React from "react";

interface Task{
  task: TaskType;
}

const TaskCard: React.FC<Task> = ({ task }) => {
  const { title, taskLists } = task;
  const idQuery = new URLSearchParams(window.location.search);
  const id = idQuery.get('id') || "";
  const {updateTaskInProject} = useProjectStore();
  const completedCount = taskLists?.filter(s => s.status === 'completed').length;

  const [showEditModal, setShowEditModal] = React.useState(false);

  return (
    <>
    <Card className="p-3 cursor-pointer rounded-lg shadow-sm border border-gray-200" onClick={() => setShowEditModal(true)}>
      <div className="font-medium text-sm text-gray-800 mb-2">{title}</div>
      <ul className="text-xs text-gray-500 space-y-1 mb-2">
        {taskLists?.map((task, i) => (
          <li key={i} className={`${task.status === 'completed' ? "line-through" : ""}`}>• {task.detail}</li>
        ))}
      </ul>
      <div className="flex justify-between text-xs text-gray-400">
        <span><CheckSquareOutlined /> {completedCount} of {taskLists?.length}</span>
      </div>
    </Card>

    <EditTaskModal
      task={{
        id : task.id,
        title : title,
        description : task.description,
        status : task.status,
        taskLists: taskLists || []
      }}
      open={showEditModal}
      onClose={() => setShowEditModal(false)}
      onSave={(updatedTask) => {
        updateTaskInProject(id, task.id || "", updatedTask);
      }}
    />
    </>
  );
};

export default TaskCard;
