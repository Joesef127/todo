import Task from '../components/Task';
import { useEffect, useState } from 'react';

export type TaskType = {
  id: string;
  title: string;
  description: string;
  priority: string;
  // completed: boolean;
};

type TaskListProps = {
  tasks: TaskType[];
  handleClearTask: ([]) => void;
};

export default function TaskList({ tasks, handleClearTask }: TaskListProps) {
  const [tasksList, setTasksList] = useState<TaskType[]>(tasks);

  useEffect(() => {
    console.log('taskslist', tasksList);


  }, [tasksList]);

  return (
      <div className="flex flex-col gap-4">
        {tasksList.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      <button
        className="w-full my-2 px-4 py-1 border text-black border-black rounded-full hover:bg-black hover:text-white transition ease-in-out duration-300"
        onClick={(e) => {
          handleClearTask([])
          setTasksList([]);
        }}
      >
        clear tasks
      </button>
    </div>
  );
}
