
import { CalendarOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { Card } from "../../../Wrapper/Card";

interface TaskCardProps {
  title: string;
  subtasks: { label: string; done: boolean }[];
  dueDate?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, subtasks, dueDate }) => {
  const completedCount = subtasks.filter(s => s.done).length;

  return (
    <Card className="p-3 rounded-lg shadow-sm border border-gray-200">
      <div className="font-medium text-sm text-gray-800 mb-2">{title}</div>
      <ul className="text-xs text-gray-500 space-y-1 mb-2">
        {subtasks.map((task, i) => (
          <li key={i} className={`${task.done ? "line-through" : ""}`}>• {task.label}</li>
        ))}
      </ul>
      <div className="flex justify-between text-xs text-gray-400">
        <span><CheckSquareOutlined /> {completedCount} of {subtasks.length}</span>
        {dueDate && <span><CalendarOutlined /> {dueDate}</span>}
      </div>
    </Card>
  );
};

export default TaskCard;
