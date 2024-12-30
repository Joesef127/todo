import Navbar from '../components/Navbar';
import round_over_plus from '../assets/icons/round_over_plus.png';
import React, { useEffect, useState } from 'react';
import CreateNewTask from '../components/CreateNewTask';
import TaskList, { TaskType } from '../pages/TaskList';

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [completedTasks, setCompletedTasks] = useState<TaskType[]>(() => {
    const savedCompleted = localStorage.getItem('completedTasks');
    return savedCompleted ? JSON.parse(savedCompleted) : [];
  });
  const [showForm, setShowForm] = useState<boolean>(true);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);

  // Load tasks from local storage on page load
  // useEffect(() => {
  //   const savedCompleted = JSON.parse(
  //     localStorage.getItem(COMPLETED_TASKS_KEY) || '[]'
  //   );
  //   setTasks(savedTasks);
  //   setCompletedTasks(savedCompleted);
  // }, []);

  const TASKS_KEY = 'tasks';
  const COMPLETED_TASKS_KEY = 'completedTasks';

  // Save tasks to local storage whenever they are updated
  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    localStorage.setItem(COMPLETED_TASKS_KEY, JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

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
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleClearTask = () => {
    setTasks([]);
    localStorage.removeItem('tasks');
  };

  const handleTaskCompletion = (taskId: string) => {
    const taskToComplete = tasks.find((task) => task.id === taskId);
    if (taskToComplete) {
      setTasks(tasks.filter((task) => task.id !== taskId));
      setCompletedTasks((prevCompleted) => [...prevCompleted, taskToComplete]);
    }
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
                    setShowCompleted(false);
                  } else if (text === 'Pending Tasks') {
                    setShowForm(false);
                    setShowCompleted(false);
                  } else if (text === 'Tasks Completed') {
                    setShowForm(false);
                    setShowCompleted(true);
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
          ) : showCompleted ? (
            <div className="p-4 my-8 rounded-xl shadow-lg max-w-xl bg-[#FBF6FF]">
              <h1 className="font-medium font-sans text-xl mb-4">
                Completed Tasks
              </h1>
              {completedTasks.length > 0 ? (
                <div>
                  <TaskList
                    tasks={completedTasks}
                    handleClearTask={() => setCompletedTasks([])}
                  />
                  <button
                    className="w-full my-2 px-4 py-1 border text-black border-black rounded-full hover:bg-black hover:text-white transition ease-in-out duration-300"
                    onClick={handleClearTask}
                  >
                    Clear Tasks
                  </button>
                </div>
              ) : (
                <p>There are no completed tasks</p>
              )}
            </div>
          ) : (
            <div className="p-4 my-8 rounded-xl shadow-lg max-w-xl bg-[#FBF6FF]">
              <h1 className="font-medium font-sans text-xl mb-4">
                Pending Tasks
              </h1>
              {tasks.length > 0 ? (
                <TaskList
                  handleClearTask={handleClearTask}
                  tasks={tasks}
                  handleTaskCompletion={handleTaskCompletion}
                />
              ) : (
                <p>There are no pending tasks</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
