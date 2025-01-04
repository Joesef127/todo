import Navbar from '../components/Navbar';
import round_over_plus from '../assets/icons/round_over_plus.png';
import React, { useEffect, useState } from 'react';
import CreateNewTask from '../components/CreateNewTask';
import TaskList from '../pages/TaskList';
import { TaskType } from '../utils/Types';
import CompletedTasks from './CompletedTasks';
import axios from 'axios';

export default function Home({ username }: { username: string }) {
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

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  useEffect(() => {
    console.log('fetching tasks...');
    axios.get('http://127.0.0.1:8000/api/tasks/').then((response) => {
      console.log(response.data);
      setTasks(response.data.tasks);
    });
  }, []);

  const handleAddTask = (
    id: number,
    name: string,
    description: string,
    due_date: string,
    priority: string
  ) => {
    const newTask: TaskType = {
      id,
      name,
      description,
      due_date,
      priority,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleClearTask = () => {
    setCompletedTasks([]);
    localStorage.removeItem('completedTasks');
  };

  const handleTaskCompletion = (taskId: number | null) => {
    const taskToComplete = tasks.find((task) => task.id === taskId);
    if (taskToComplete) {
      setTasks(tasks.filter((task) => task.id !== taskId));
      setCompletedTasks((prevCompleted) => [...prevCompleted, taskToComplete]);
    }
  };

  const topButtonsText = [
    'Create New Task',
    'Pending Tasks',
    'Completed Tasks',
  ];

  return (
    <div className="w-full overflow-auto">
      <Navbar />
      <div className="w-full font-sans flex flex-col items-center justify-center overflow-auto">
        <div className="max-w-lg p-4 overflow-x-scroll">
          <div className="py-10">
            <h1 className="font-medium font-sans text-xl">
              Hello {username || 'Dear User'}!
            </h1>
            <p className="font-normal text-base">
              You have {tasks.length} pending tasks
            </p>
          </div>
          <div className="flex gap-2 flex-wrap ">
            {topButtonsText.map((text, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={text}
                  className={`
                  max-sm:w-24 max-sm:h-24 max-sm:text-sm m-1 px-2 py-3 border w-32 h-36 rounded-2xl flex flex-col justify-between gap-4 cursor-pointer 
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
                    } else if (text === 'Completed Tasks') {
                      setShowForm(false);
                      setShowCompleted(true);
                    }
                  }}
                >
                  <figure
                    className={`p-1 w-fit rounded-full max-sm:w-6 ${
                      isEven ? 'bg-red-400' : 'bg-green-800'
                    }`}
                  >
                    <img src={round_over_plus} alt="icon" className="w-6" />
                  </figure>
                  <span>{text}</span>
                </div>
              );
            })}
          </div>
          <div>
            {showForm ? (
              <div className="p-4 my-8 bg-white rounded-xl shadow-lg max-w-xl">
                <h2 className="mt-4 mb-8 font-medium font-sans text-5xl max-sm:text-3xl max-sm:mb-4">
                  Create{' '}
                  <span className="font-light text-gray-300">New Task</span>
                </h2>
                <CreateNewTask handleAddTask={handleAddTask} />
              </div>
            ) : showCompleted ? (
              <div className="p-4 my-8 rounded-xl shadow-lg max-w-xl bg-[#FBF6FF]">
                <h2 className="mt-4 mb-8 font-medium font-sans text-5xl max-sm:text-3xl max-sm:mb-4">
                  Completed{' '}
                  <span className="font-light text-gray-300">Task</span>
                </h2>
                {completedTasks.length > 0 ? (
                  <div>
                    <CompletedTasks
                      completedTasks={completedTasks}
                      handleClearTask={handleClearTask}
                    />
                  </div>
                ) : (
                  <p>There are no completed tasks</p>
                )}
              </div>
            ) : (
              <div className="p-4 my-8 rounded-xl shadow-lg max-w-xl bg-[#FBF6FF]">
                <h2 className="mt-4 mb-8 font-medium font-sans text-5xl max-sm:text-3xl max-sm:mb-4">
                  Pending <span className="font-light text-gray-300">Task</span>
                </h2>
                {tasks.length > 0 ? (
                  <TaskList
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
      </div>
    </div>
  );
}
