import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import TaskFooter from "./TaskFooter";
import type React from "react";

interface Task {
  id: string;
  title: string;
  subtasks: { label: string; done: boolean }[];
  dueDate?: string;
}

interface ColumnProps {
  id: string;
  title: string;
  color?: string;
  tasks: Task[];
}

const Column: React.FC<ColumnProps> = ({ id, title, color = "gray", tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="bg-white rounded-lg p-2 w-full min-w-[230px] flex flex-col border">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <div className={`w-5 h-5 rounded-full border-2`}>
            <div
                style={{ backgroundColor: title === "In Progress" ? color : "transparent" }}
              className={`h-full rounded-full ${title==="In Progress" ? "w-1/2" : "w-full"}`}
            ></div>
          </div>
          {title}
        </div>
        <div
          className={`w-5 h-5 flex items-center justify-center text-xs font-semibold text-gray-500`}>
            <span className="text-xs text-gray-500">{tasks.length}</span>
        </div>
      </div>

      <div ref={setNodeRef} className="flex-1 space-y-3 min-h-[40px]">
        {tasks.map(task => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>

      <TaskFooter />
    </div>
  );
};

export default Column;
