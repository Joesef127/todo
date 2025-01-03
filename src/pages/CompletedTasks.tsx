import ClearTaskModal from '../components/ClearTasksModal';
import CompletedTask from '../components/CompletedTask';
import { CompletedTaskListProps } from '../utils/Types';
import { useState } from 'react';

export default function CompletedTasks({
  completedTasks,
  handleClearTask,
}: CompletedTaskListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openClearModal = () => {
    setIsModalOpen(true);
  };

  const closeClearModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="flex flex-col gap-2">
        {completedTasks.map((completedTask) => (
          <CompletedTask
            key={completedTask.id}
            {...completedTask}
          />
        ))}
        <button
          className="w-full my-2 px-4 py-1 border text-black border-black rounded-full hover:bg-black hover:text-white transition ease-in-out duration-300"
          onClick={openClearModal}
        >
          Clear Tasks
        </button>
      </div>
      <div>
        <ClearTaskModal
          isOpen={isModalOpen}
          onClose={closeClearModal}
          onDelete={handleClearTask}
        />
      </div>
    </div>
  );
}
