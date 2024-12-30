import Navbar from '../components/Navbar';
import round_over_plus from '../assets/icons/round_over_plus.png';
import React, { useEffect, useState } from 'react';
import CreateNewTask from '../components/CreateNewTask';
import TaskList, { TaskType } from '../pages/TaskList';

export default function Home() {
  // const [createTask, setCreateTask] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [showForm, setShowForm] = useState<boolean>(true);

  useEffect(() => {
    console.log('tasks', tasks);
  });

  // const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
  //   const formData = new FormData(e.currentTarget);
  //   const newTask = {
  //     id: crypto.randomUUID(),
  //     title: formData.get('title') as string,
  //     description: formData.get('description') as string,
  //     priority: formData.get('priority') as string,
  //     completed: false,
  //   };
  //   setTasks((prevTasks) => [...prevTasks, newTask]);
  //   // e.currentTarget.reset();
  // }

  const handleAddTask = (
    title: string,
    description: string,
    priority: string
  ) => {
    const newTask: TaskType = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      // completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleClearTask = () => {
    setTasks([]);
  };

  const topButtonsText = [
    'Create New Task',
    'Pending Tasks',
    'Tasks Completed',
  ];

  return (
    <>
      <Navbar />
      <div className="p-8 font-sans">
        <div className="py-10">
          <h1 className="font-medium font-sans text-xl">Hello, Adegbola</h1>
          <p className="font-normal text-base">
            You have {tasks.length} tasks remaining
          </p>
        </div>
        <div className="flex gap-4">
          {topButtonsText.map((text, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={text}
                className={`
                  m-1 px-2 py-3 border w-32 h-36 rounded-2xl flex flex-col justify-between gap-7 cursor-pointer 
                  ${isEven ? 'hover:bg-red-400' : 'hover:bg-green-800'} 
                  ${isEven ? 'border-red-400' : 'border-green-800'}
                  ${isEven ? 'text-red-400' : 'text-green-800'}
                  hover:text-white focus:text-white active:text-white transition ease-in-out duration-300
                `}
                onClick={() => {
                  if (text === 'Create New Task') {
                    setShowForm(true);
                  } else if (text === 'Pending Tasks') {
                    setShowForm(false);
                  }
                }}
              >
                <figure
                  className={`p-1 w-fit rounded-full ${
                    isEven ? 'bg-red-400' : 'bg-green-800'
                  }`}
                >
                  <img src={round_over_plus} alt="icon" className="w-6" />
                </figure>
                {text}
              </div>
            );
          })}
        </div>
        <div>
          {showForm ? (
            <div className="p-4 my-8 bg-white rounded-xl shadow-lg max-w-xl">
              <h2 className="mt-4 mb-10 font-bold font-sans text-5xl">
                Create{' '}
                <span className="font-light text-gray-300">New Task</span>
              </h2>
              <CreateNewTask handleAddTask={handleAddTask} />
            </div>
          ) : (
            <div className="p-4 my-8 bg-white rounded-xl shadow-lg max-w-xl">
              <h1 className="font-medium font-sans text-xl mb-4">Your Tasks</h1>
              {tasks.length > 0 ? (
                <TaskList handleClearTask={handleClearTask} tasks={tasks} />
              ) : (
                <p>There are no tasks</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
