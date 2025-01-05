import { useState } from 'react';
import Task from '../components/Task';
import { TaskListProps } from '../utils/Types';
import CompleteTask from '../components/CompleteTaskModal';

export default function TaskList({
  tasks,
  handleTaskCompletion,
  updateTaskInState,
  handleDeleteTask
}: TaskListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [taskName, setTaskName] = useState<string | undefined>(undefined);

  const handleDelete = (taskId: number | null) => {
    if (handleTaskCompletion) {
      handleTaskCompletion(taskId);
    }
  };

  const openDeleteModal = (taskId: number) => {
    setIsModalOpen(true);
    setSelectedTask(taskId);
    setTaskName(tasks.find((task) => task.id === taskId)?.name);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <Task
            key={task.id}
            {...task}
            updateTaskInState={updateTaskInState}
            handleDeleteTask={handleDeleteTask}
            openDeleteModal={() => {
              openDeleteModal(task.id);
            
            }}
          />
        ))}
      </div>
      <div>
        <CompleteTask
          isOpen={isModalOpen}
          onClose={closeDeleteModal}
          onDelete={() => {
            handleDelete(selectedTask);
          }}
          taskName={taskName}
        />
      </div>
    </div>
  );
}
