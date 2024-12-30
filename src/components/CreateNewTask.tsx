import { useState } from 'react';

type CreateNewTaskProps = {
  handleAddTask: (title: string, description: string, priority: string) => void;
  // setCreateTask: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateNewTask({ handleAddTask }: CreateNewTaskProps) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddTask(title, description, priority);
    // setCreateTask(false); // Close the modal after submission
    e.currentTarget.reset();
  };

  return (
    // <div className="p-4 my-8 bg-white rounded-xl shadow-lg max-w-xl">
    //   <h2 className="mt-4 mb-10 font-bold font-sans text-5xl">
    //     Create <span className="font-light text-gray-300">New Task</span>
    //   </h2>
      <form
        id="create-task"
        className="rounded-xl bg-gray-200 px-4 py-6"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <input
            name="title"
            className="block w-full bg-transparent border border-b-2 border-b-stone-500 outline-none font-light text-xl text-gray-600"
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
            className="block w-full bg-transparent border border-b-2 border-b-stone-500 outline-none font-light text-xl text-gray-600"
            value={description}
            placeholder="Task Description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <select
            name="priority"
            className="block w-full bg-transparent border border-b-2 border-b-stone-500 outline-none font-light text-xl text-gray-600"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="">Select Priority</option>
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
    // </div>
  );
}
