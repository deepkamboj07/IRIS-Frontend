import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import Column from "./Column";
import { useState } from "react";

// Define valid column IDs as union
type ColumnType = 'todo' | 'inProgress' | 'review' | 'completed';

interface Task {
  id: string;
  title: string;
  subtasks: { label: string; done: boolean }[];
  dueDate: string;
}

type ColumnsState = {
  [key in ColumnType]: Task[];
};

const initialTasks: ColumnsState = {
  todo: [
    {
      id: "t1",
      title: "Complete Quarterly Report Draft",
      subtasks: [],
      dueDate: "17 Jun"
    },
    {
      id: "t2",
      title: "Learn Basic Spanish Phrases",
      subtasks: [
        { label: "Practice greetings and introductions", done: false },
        { label: "Memorize 10 common verbs", done: false },
        { label: "Watch a 10-minute YouTube lesson", done: false }
      ],
      dueDate: "17 Jun"
    }
  ],
  inProgress: [
    {
      id: "t3",
      title: "Start a Python Coding Project",
      subtasks: [
        { label: "Set up development environment", done: true },
        { label: "Write pseudocode before coding", done: false },
        { label: "Debug and test final program", done: false }
      ],
      dueDate: "17 Jun"
    }
  ],
  review: [],
  completed: []
};

const Board = () => {
  const [columns, setColumns] = useState<ColumnsState>(initialTasks);

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

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-auto p-4 h-[calc(100vh-80px)]">
        <Column id="todo" title="Todo" color="blue" tasks={columns.todo} />
        <Column id="inProgress" title="In Progress" color="purple" tasks={columns.inProgress} />
        <Column id="review" title="In Review" color="yellow" tasks={columns.review} />
        <Column id="completed" title="Completed" color="green" tasks={columns.completed} />
      </div>
    </DndContext>
  );
};

export default Board;
