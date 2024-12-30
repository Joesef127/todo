import { useNavigate } from 'react-router-dom';
import task from '../assets/icons/task.png';

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="p-4 bg-white shadow-md flex items-center justify-center mx-auto w-full">
      <div className="max-w-lg w-full flex items-center justify-between">
        <div className='flex gap-1'>
          {/* <h1 className="text-2xl font-bold">To Do</h1> */}
          <span>
            <img src={task} alt="logo" className="w-10" />
          </span>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-1 border text-black border-black rounded-full hover:bg-black hover:text-white transition ease-in-out duration-300"
        >
          Back
        </button>
      </div>
    </nav>
  );
}
