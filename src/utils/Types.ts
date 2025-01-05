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
  updateTaskInState?: (updatedtask: TaskType) => void;
  handleTaskCompletion?: (taskId: number | null) => void;
  handleDeleteTask?: (taskId: number) => void;
};

export type CompletedTaskListProps = {
  completedTasks: TaskType[];
  handleClearTask: () => void;
};

export type TaskProps = TaskType & {
  openDeleteModal: (taskId: number) => void;
  updateTaskInState?: (updatedTask: TaskType) => void;
  handleDeleteTask?: (taskId: number) => void;
};

export type CompleteTaskModalProps = {
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
  editTask: (editedTask: NewTask) => void;
};
