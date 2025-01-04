import { TaskType } from '../utils/Types';
import { getPriorityBg } from '../utils/utils';

export default function CompletedTask({ ...props }: TaskType) {
  return (
    <div className="my-2 bg-[#F0F0F0] rounded-xl p-4 flex justify-between items-center flex-wrap-reverse min-w-[280px]">
      <div>
        <h2 className="capitalize font-medium text-xl max-sm:text-lg text-black">
          {props.name}
        </h2>
        <p className="capitalize font-light">{props.description}</p>
        <p className="text-gray-500 text-sm">Due: {props.due_date}</p>
      </div>
      <div>
        <p
          className={`text-white text-base py-1 px-2 w-fit rounded-lg ${getPriorityBg(props.priority)}`}
        >
          {props.priority}
        </p>
      </div>
    </div>
  );
}
