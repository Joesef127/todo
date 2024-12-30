// import { TaskType } from '../pages/TaskList';
import { TaskProps } from 'Types';



export default function Task({ handleTaskCompletion, ...props }: TaskProps) {
  const getPriorityBg = () => {
    switch (props.priority) {
      case 'Not Important':
        return 'bg-orange-700';
      case 'Moderate':
        return 'bg-blue-600';
      case 'Very Important':
        return 'bg-green-800';
      default:
        return '';
    }
  };

  return (
    <div className="my-2 bg-[#F0F0F0] rounded-xl p-4 flex justify-between items-center">
      <div>
        <h2 className="capitalize font-medium text-xl max-sm:text-lg text-black">
          {props.title}
        </h2>
        <p className="capitalize font-light">{props.description}</p>
        <p
          className={`text-white text-base py-1 px-2 w-fit rounded-lg ${getPriorityBg()}`}
        >
          {props.priority}
        </p>
      </div>
      <div className="w-6 h-6 border border-solid">
        <input
          className="w-full h-full"
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked && handleTaskCompletion) {
              handleTaskCompletion(props.id);
            }
          }}
        />
      </div>
    </div>
  );
}
