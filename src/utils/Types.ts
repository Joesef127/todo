export type TaskType = {
  id: number;
  name: string;
  description: string;
  due_date: string;
  priority: string;
};

export type NewTask = {
  name: string,
  description: string,
  due_date: string,
  priority: string,
}

export type CreateNewTaskProps = {
  addNewTask: (
    // id: number,
    name: string,
    description: string,
    due_date: string,
    priority: string
  ) => void;
};

export type TaskListProps = {
  tasks: TaskType[];
  handleTaskCompletion?: (taskId: number | null) => void;
};

export type CompletedTaskListProps = {
  completedTasks: TaskType[];
  handleClearTask: () => void;
};

export type TaskProps = TaskType & {
  openDeleteModal: (taskId: number) => void;
};

export type DeleteTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  taskName: string | undefined;
};

export type ClearTasksModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export type CreateTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type EditTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id: number | null;
  openEditModal: () => void;
};
