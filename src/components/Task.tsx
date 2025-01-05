import { NewTask, TaskProps } from '../utils/Types';
import EditTaskModal from './EditTask';
import { useEffect, useState } from 'react';
import { baseUrl, getPriorityBg } from '../utils/utils';
import axios from 'axios';
// import axios from 'axios';
// import { baseUrl } from '../utils/utils';

export default function Task({
  openDeleteModal,
  updateTaskInState,
  handleDeleteTask,
  ...props
}: TaskProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<NewTask>();

  useEffect(() => {
    console.log(
      'Task id: ',
      props.id,
      'task name: ',
      props.name,
      'task desc: ',
      props.description,
      'task due date: ',
      props.due_date,
      'task priority: ',
      props.priority
    );
  }, []);

  const openEditModal = (taskId: number | null) => {
    setIsModalOpen(true);
    setSelectedTask(props.id);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const editTask = (editedTask: NewTask) => {
    setEditedTask(editedTask);
    console.log(editedTask);
  };

  return (
    <div className="my-2 bg-[#F0F0F0] rounded-xl p-4 flex justify-between items-center max-sm:flex-col max-sm:items-start gap-3">
      <div className="flex flex-col gap-2">
        <h2 className="capitalize font-medium text-xl max-sm:text-lg text-black">
          {editedTask ? editedTask.name : props.name}
        </h2>
        <p className="capitalize font-light max-sm:text-sm">
          {editedTask ? editedTask.description : props.description}
        </p>
        <p className="text-gray-500 text-sm">
          Due: {editedTask ? editedTask.due_date : props.due_date}
        </p>
        <p
          className={`text-white text-base max-sm:text-sm py-1 px-2 w-fit rounded-lg ${getPriorityBg(
            editedTask ? editedTask.priority : props.priority
          )}`}
        >
          {editedTask ? editedTask.priority : props.priority}
        </p>
      </div>
      <div className="max-sm:w-full">
        <div className="flex items-center justify-between w-full flex-col max-sm:gap-2 max-sm:w-full max-sm:flex-row-reverse">
          <button
            className="w-full px-3 py-1 border hover:text-black border-red-700 rounded-lg bg-red-700 text-white hover:border-black hover:bg-transparent transition ease-in-out duration-300"
            onClick={() => {
              openDeleteModal(props.id);
            }}
          >
            Done
          </button>
          <button
            type="submit"
            className="w-full my-1 px-3 py-1 border text-black border-black rounded-lg hover:bg-black hover:text-white transition ease-in-out duration-300 max-sm:w-full"
           
            onClick={(e) => {
              openEditModal(props.id);
            }}
          >
            Edit Task
          </button>
          <button
            type="submit"
            className="w-full my-1 px-3 py-1 border text-black border-black rounded-lg hover:bg-black hover:text-white transition ease-in-out duration-300 max-sm:w-full"
            
            onClick={(e) => {
              openDeleteModal(props.id);
              if (handleDeleteTask) handleDeleteTask(props.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <EditTaskModal
        id={selectedTask}
        isOpen={isModalOpen}
        onClose={closeEditModal}
        editTask={editTask}
      />
    </div>
  );
}
