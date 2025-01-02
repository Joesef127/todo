export type TaskType = {
  id: string;
  title: string;
  description: string;
  date: string;
  priority: string;
  // completed: boolean;
};

export type CreateNewTaskProps = {
  handleAddTask: (
    title: string,
    description: string,
    date: string,
    priority: string
  ) => void;
};

export type TaskListProps = {
  tasks: TaskType[];
  // handleClearTask: () => void;
  handleTaskCompletion?: (taskId: string | null) => void;
  // priority: string;
};

export type CompletedTaskListProps = {
  completedTasks: TaskType[];
  handleClearTask: () => void;
  // handleTaskCompletion?: (taskId: string) => void;
  // priority: string;
};

export type TaskProps = TaskType & {
  // handleTaskCompletion?: (taskId: string) => void;
  openDeleteModal: (taskId: string) => void;
};

export type DeleteTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  taskId: string | null;
}

export type ClearTasksModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export type CreateTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
}