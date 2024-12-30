import { TaskType } from '../pages/TaskList';

type TaskProps = TaskType & {
  handleTaskCompletion?: (taskId: string) => void;
};

export default function Task({ handleTaskCompletion, ...props }: TaskProps) {
  return (
    <div className="my-2 bg-[#F0F0F0] rounded-xl p-4 flex justify-between items-center">
      <div>
        <h2 className="uppercase font-normal text-2xl text-black">
          {props.title}
        </h2>
        <p className="capitalize">{props.description}</p>
        <p className="text-[#909090] text-base">Priority: {props.priority}</p>
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

