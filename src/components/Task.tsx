// import { TaskType } from '../pages/TaskList';
import { TaskProps } from 'Types';



export default function Task({ openDeleteModal, ...props }: TaskProps) {
  
  const getPriorityBg = () => {
    switch (props.priority) {
      case 'Not Important':
        return 'bg-orange-400';
      case 'Moderate':
        return 'bg-blue-600';
      case 'Very Important':
        return 'bg-green-800';
      default:
        return '';
    }
  };

  return (
    <div className="my-2 bg-[#F0F0F0] rounded-xl p-4 flex justify-between items-center max-sm:flex-col max-sm:items-start gap-3">
      <div className='flex flex-col gap-2'>
        <h2 className="capitalize font-medium text-xl max-sm:text-lg text-black">
          {props.title}
        </h2>
        <p className="capitalize font-light max-sm:text-sm">{props.description}</p>
        <p className="text-gray-500 text-sm">Due: {props.date}</p>
        <p
          className={`text-white text-base max-sm:text-sm py-1 px-2 w-fit rounded-lg ${getPriorityBg()}`}
        >
          {props.priority}
        </p>
      </div>
      <div className="px-2 py-1 text-white cursor-pointer border border-solid rounded-lg bg-red-700 max-sm:text-sm">
        <button
          className="w-full h-full"
          onClick={() => {
            openDeleteModal(props.id);
            // if (props.id !== undefined) {
            //   handleTaskCompletion(props.id);
            // }
          }}
        >Done</button>
      </div>
    </div>
  );
}
