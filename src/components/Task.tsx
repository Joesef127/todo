import { TaskType } from "pages/TaskList";

export default function Task(props: TaskType) {
  return (
    <div className="my-2">
      <h2>Task Title: {props.title}</h2>
      <p>Task Description: {props.description}</p>
      <p>Priority: {props.priority}</p>
      <p>Completed: {props.completed}</p>
    </div>
  )
}