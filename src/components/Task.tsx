import { NewTask, TaskProps, TaskType } from '../utils/Types';
import EditTaskModal from './EditTask';
import { useState } from 'react';
import { getPriorityBg } from '../utils/utils';
import DeleteTaskModal from '../components/DeleteTaskModal';

export default function Task({
  openCompleteModal,
  updateTaskInState,
  handleDeleteTask,
  handleCreateTask,
  createdTask,
  ...props
}: TaskProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<NewTask>();
  const [newlyCreatedTask, setNewlyCreatedTask] = useState<TaskType | undefined>(createdTask);

  const handleTaskDelete = () => {
    if (handleDeleteTask) {
      handleDeleteTask(props.id);
    }
  };

  const openEditModal = (taskId: number | null) => {
    setIsEditModalOpen(true);
    setSelectedTask(props.id);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  const openDeleteModal = (taskId: number | null) => {
    if (handleDeleteTask) {
      setIsDeleteModalOpen(true);
      setSelectedTask(props.id);
    }
  };

  const closeDeleteModal = () => {
      setIsDeleteModalOpen(false);
      setSelectedTask(null);
  };

  const editTask = (editedTask: NewTask) => {
    setEditedTask(editedTask);
    console.log('editedTask', editedTask);
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
            className="w-full my-1 px-3 py-1 border text-black border-black rounded-lg hover:bg-black hover:text-white transition ease-in-out duration-300 max-sm:w-full"
            onClick={() => {
              openCompleteModal(props.id);
            }}
          >
            Complete
          </button>
          <button
            type="submit"
            className="w-full my-1 px-3 py-1 border text-black border-black rounded-lg hover:bg-black hover:text-white transition ease-in-out duration-300 max-sm:w-full"
           
            onClick={(e) => {
              openEditModal(props.id);
            }}
          >
            Edit
          </button>
          <button
            type="submit"
             className="w-full px-3 py-1 border hover:text-black border-red-700 rounded-lg bg-red-700 text-white hover:border-black hover:bg-transparent transition ease-in-out duration-300"
            
            onClick={(e) => {
              openDeleteModal(props.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <EditTaskModal
        id={selectedTask}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        editTask={editTask}
      />
      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleTaskDelete} 
        taskName={editedTask? editedTask.name : props.name}
        />
    </div>
  );
}
