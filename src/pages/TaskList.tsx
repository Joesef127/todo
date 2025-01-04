import { useState } from 'react';
import Task from '../components/Task';
import { TaskListProps } from '../utils/Types';
import DeleteTask from '../components/DeleteTaskModal';
import EditModal from '../components/EditTask';

export default function TaskList({
  tasks,
  handleTaskCompletion,
}: TaskListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const handleDelete = (taskId: number | null) => {
    if (handleTaskCompletion) {
      handleTaskCompletion(taskId);
    }
  };

  const openDeleteModal = (taskId: number) => {
    setIsModalOpen(true);
    setSelectedTask(taskId);
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
              openDeleteModal={() => {
                openDeleteModal(task.id);
              }}
            />
        ))}
      </div>
      <div>
        <DeleteTask
          isOpen={isModalOpen}
          onClose={closeDeleteModal}
          onDelete={() => {
            handleDelete(selectedTask);
          }}
          taskId={selectedTask}
        />
      </div>
    </div>
  );
}
