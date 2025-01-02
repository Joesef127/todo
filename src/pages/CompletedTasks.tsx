import ClearTaskModal from '../components/ClearTasksModal';
import CompletedTask from '../components/CompletedTask';
import { CompletedTaskListProps } from '../utils/Types';
import { useState } from 'react';

export default function CompletedTasks({
  completedTasks,
  handleClearTask,

  // handleTaskCompletion,
  // priority,
}: CompletedTaskListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [doneTasks, setDoneTasks] = useState<string | null>(null);

  // const handleClear = (taskId: string | null) => {
  //   console.log(`Deleted task ${taskId} successfully`)
  //   handleTaskCompletion(taskId);
  // }

  const openClearModal = () => {
    setIsModalOpen(true);
    // setDoneTask(taskId);
  };

  const closeClearModal = () => {
    setIsModalOpen(false);
    // setSelectedTask(null);
  };
  return (
    <div>
      <div className="flex flex-col gap-2">
        {completedTasks.map((completedTask) => (
          <CompletedTask
            key={completedTask.id}
            {...completedTask}
            // handleTaskCompletion={handleTaskCompletion}
            // priority={priority}
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
