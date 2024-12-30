export type TaskType = {
  id: string;
  title: string;
  description: string;
  priority: string;
  // completed: boolean;
};

export type TaskListProps = {
  tasks: TaskType[];
  handleClearTask: () => void;
  handleTaskCompletion?: (taskId: string) => void;
  priority: string;
};

export type TaskProps = TaskType & {
  handleTaskCompletion?: (taskId: string) => void;
};
