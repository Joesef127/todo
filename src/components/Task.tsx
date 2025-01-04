import { TaskProps } from '../utils/Types';
import EditTaskModal from './EditTask';
import { useState } from 'react';
import { getPriorityBg } from '../utils/utils';

export default function Task({ openDeleteModal, ...props }: TaskProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const openEditModal = (taskId: number | null) => {
    setIsModalOpen(true);
    setSelectedTask(props.id);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="my-2 bg-[#F0F0F0] rounded-xl p-4 flex justify-between items-center max-sm:flex-col max-sm:items-start gap-3">
      <div className="flex flex-col gap-2">
        <h2 className="capitalize font-medium text-xl max-sm:text-lg text-black">
          {props.name}
        </h2>
        <p className="capitalize font-light max-sm:text-sm">
          {props.description}
        </p>
        <p className="text-gray-500 text-sm">Due: {props.due_date}</p>
        <p
          className={`text-white text-base max-sm:text-sm py-1 px-2 w-fit rounded-lg ${getPriorityBg(
            props.priority
          )}`}
        >
          {props.priority}
        </p>
      </div>
      <div>
        <div className="flex items-center justify-center w-full flex-col">
        <button
          className="w-full my-2 px-4 py-1 border text-black border-black rounded-full hover:bg-red-700 hover:text-white hover:border-red-700 transition ease-in-out duration-300"
          onClick={() => {
            openDeleteModal(props.id);
          }}
        >
          Done
        </button>
          <button
            type="submit"
            className="w-full my-2 px-4 py-1 border text-black border-black rounded-full hover:bg-black hover:text-white transition ease-in-out duration-300"
            form="create-task"
            onClick={() => {
              openEditModal(props.id);
            }}
          >
            Edit Task
          </button>
        </div>
      </div>
      <EditTaskModal
        id={selectedTask}
        isOpen={isModalOpen}
        onClose={closeEditModal}
        openEditModal={() => {
          openEditModal(selectedTask);
        }}
      />
    </div>
  );
}
