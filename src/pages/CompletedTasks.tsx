import CompletedTask from '../components/CompletedTask';
import { CompletedTaskListProps } from 'Types';

export default function CompletedTasks({
  tasks,
  handleClearTask,

  // handleTaskCompletion,
  priority,
}: CompletedTaskListProps) {
  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <CompletedTask
          key={task.id}
          {...task}
          // handleTaskCompletion={handleTaskCompletion}
          // priority={priority}
        />
      ))}
      <button
        className="w-full my-2 px-4 py-1 border text-black border-black rounded-full hover:bg-black hover:text-white transition ease-in-out duration-300"
        onClick={handleClearTask}
      >
        Clear Tasks
      </button>
    </div>
  );
}
