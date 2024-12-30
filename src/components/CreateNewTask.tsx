import { useState } from 'react';

type CreateNewTaskProps = {
  handleAddTask: (title: string, description: string, priority: string) => void;
};

export default function CreateNewTask({ handleAddTask }: CreateNewTaskProps) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddTask(title, description, priority);
    // e.currentTarget.reset();
    setTitle('');
    setDescription('');
    setPriority('');
  };

  // Function to determine the select's text color class
  const getPriorityColor = () => {
    switch (priority) {
      case 'Not Important':
        return 'text-orange-700';
      case 'Moderate':
        return 'text-blue-600';
      case 'Very Important':
        return 'text-green-800';
      default:
        return 'text-gray-500'; // Default color
    }
  };

  return (
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
          className="block w-full bg-transparent border-b-2 border-b-stone-500 outline-none font-light text-xl max-sm:text-lg text-gray-600"
          value={description}
          placeholder="Task Description (optional)"
          onChange={(e) => setDescription(e.target.value)}
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
        >
          Create Task
        </button>
      </div>
    </form>
  );
}
