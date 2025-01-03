export type TaskType = {
  id: string;
  title: string;
  description: string;
  date: string;
  priority: string;
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
  handleTaskCompletion?: (taskId: string | null) => void;
};

export type CompletedTaskListProps = {
  completedTasks: TaskType[];
  handleClearTask: () => void;
};

export type TaskProps = TaskType & {
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