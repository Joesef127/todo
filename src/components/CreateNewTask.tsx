import { useState } from 'react';
import CreateTaskModal from './CreateTaskModal';
import { CreateNewTaskProps } from '../utils/Types';
import { getPriorityColor } from '../utils/utils';

export default function CreateNewTask({ addNewTask }: CreateNewTaskProps) {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [priority, setPriority] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const openCreateModal = (taskId: string) => {
    setIsModalOpen(true);
    setSelectedTask(taskId);
  };

  const closeCreateModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewTask(name, description, dueDate, priority);
    setName('');
    setDescription('');
    setDueDate('');
    setPriority('');
  };


  return (
    <div>
      <form
        id="create-task"
        className="rounded-xl bg-[#FDFBFB] px-4 py-6"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <input
            name="title"
            className="block w-full bg-transparent border-b-2 border-b-stone-500 outline-none font-light text-xl max-sm:text-lg text-gray-600"
            type="text"
            value={name}
            placeholder="Task Title"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            name="description"
            type="text"
            className="block w-full bg-transparent border-b-2 border-b-stone-500 outline-none font-light text-xl max-sm:text-lg text-gray-600"
            value={description}
            placeholder="Task Description (optional)"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <div className="flex relative w-full  bg-[#FDFBFB] border-b-2 border-b-stone-500 outline-none font-light ">
            <label className={`absolute h-full "w-3/4" text-gray-600 ${dueDate ? 'text-xs -top-2 text-gray-600' : 'text-xl max-sm:text-lg opacity-70 bg-[#FDFBFB]'}`}>Due Date</label>
            <input
              name="date"
              type="date"
              className={`${dueDate ? 'text-xl max-sm:text-lg text-gray-600' : 'text-transparent active:text-transparent'} block w-full h-full outline-none bg-inherit`}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4">
          <select
            name="priority"
            className={`block w-full bg-transparent border-b-2 border-b-stone-500 outline-none font-light text-xl max-sm:text-lg ${getPriorityColor(priority)}`}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="" className="text-gray-500">
              Select Priority
            </option>
            <option value="not important">Not Important</option>
            <option value="moderate">Moderate</option>
            <option value="very important">Very Important</option>
          </select>
        </div>
        <div className="my-8 flex items-center justify-center w-full">
          <button
            type="submit"
            className="w-full my-2 px-4 py-1 border text-black border-black rounded-full hover:bg-black hover:text-white transition ease-in-out duration-300"
            form="create-task"
            onClick={() => {
              openCreateModal(name);
            }}
          >
            Create Task
          </button>
        </div>
      </form>
      {selectedTask && (
        <CreateTaskModal isOpen={isModalOpen} onClose={closeCreateModal} />
      )}
    </div>
  );
}
