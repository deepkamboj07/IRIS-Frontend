import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import Column from "./Column";
import { useEffect, useState } from "react";
import { useProjectStore, type TaskType } from "../../../store/useProjectStore";

// Define valid column IDs as union
type ColumnType = 'todo' | 'inProgress' | 'inReview' | 'completed';

interface Task {
  id: string;
  title: string;
  subtasks: { label: string; done: boolean }[];
  dueDate: string;
}

type ColumnsState = {
  [key in ColumnType]: Task[];
};


const Board = () => {

  const { singleProject } = useProjectStore();

  const [pendingTasks, setPendingTasks] = useState<TaskType[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<TaskType[]>([]);
  const [reviewTasks, setReviewTasks] = useState<TaskType[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskType[]>([]);

  const [columns, setColumns] = useState<ColumnsState>({
    todo: [],
    inProgress: [],
    inReview: [],
    completed: []
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !active) return;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sourceEntry = Object.entries(columns).find(([_, tasks]) =>
      tasks.find(task => task.id === active.id)
    );

    if (!sourceEntry) return;

    const sourceKey = sourceEntry[0] as ColumnType;
    const task = sourceEntry[1].find(task => task.id === active.id);
    if (!task) return;

    const destinationKey = over.id as ColumnType;
    if (sourceKey === destinationKey) return;

    setColumns(prev => ({
      ...prev,
      [sourceKey]: prev[sourceKey].filter(t => t.id !== task.id),
      [destinationKey]: [...prev[destinationKey], task]
    }));
  };

  useEffect(() => {
    if(!singleProject || !singleProject.tasks) return;
    const pendingTasks = singleProject.tasks.filter(task => task.status === 'pending');
    const inProgressTasks = singleProject.tasks.filter(task => task.status === 'inProgress');
    const reviewTasks = singleProject.tasks.filter(task => task.status === 'inReview');
    const completedTasks = singleProject.tasks.filter(task => task.status === 'completed');
    console.log("Pending Tasks:", pendingTasks);
    setPendingTasks(pendingTasks);
    setInProgressTasks(inProgressTasks);
    setReviewTasks(reviewTasks);
    setCompletedTasks(completedTasks);
  }, [singleProject]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-auto p-4 h-[calc(100vh-80px)]">
        <Column id="todo" title="Todo" color="blue" tasks={pendingTasks} />
        <Column id="inProgress" title="In Progress" color="purple" tasks={inProgressTasks} />
        <Column id="review" title="In Review" color="yellow" tasks={reviewTasks} />
        <Column id="completed" title="Completed" color="green" tasks={completedTasks} />
      </div>
    </DndContext>
  );
};

export default Board;
