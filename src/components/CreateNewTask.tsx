import { useState } from 'react';
import CreateTaskModal from './CreateTaskModal';
import { CreateNewTaskProps } from '../utils/Types';

export default function CreateNewTask({ handleAddTask }: CreateNewTaskProps) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
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
    handleAddTask(title, description, date, priority);
    setTitle('');
    setDescription('');
    setDate('');
    setPriority('');
  };

  // Function to determine the select's text color class
  const getPriorityColor = () => {
    switch (priority) {
      case 'Not Important':
        return 'text-orange-400';
      case 'Moderate':
        return 'text-blue-600';
      case 'Very Important':
        return 'text-green-800';
      default:
        return 'text-gray-500'; // Default color
    }
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
            value={title}
            placeholder="Task Title"
            onChange={(e) => setTitle(e.target.value)}
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
          <input
            name="date"
            type="date"
            className="block w-full bg-transparent border-b-2 border-b-stone-500 outline-none font-light text-xl max-sm:text-lg text-gray-600"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <select
            name="priority"
            className={`block w-full bg-transparent border-b-2 border-b-stone-500 outline-none font-light text-xl max-sm:text-lg ${getPriorityColor()}`}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="" className="text-gray-500">
              Select Priority
            </option>
            <option value="Not Important">Not Important</option>
            <option value="Moderate">Moderate</option>
            <option value="Very Important">Very Important</option>
          </select>
        </div>
        <div className="my-8 flex items-center justify-center w-full">
          <button
            type="submit"
            className="w-full my-2 px-4 py-1 border text-black border-black rounded-full hover:bg-black hover:text-white transition ease-in-out duration-300"
            form="create-task"
            onClick={() => {openCreateModal(title)}}
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
