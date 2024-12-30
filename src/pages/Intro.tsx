import bg_two from '../assets/images/bg_two.jpg';
import { useNavigate } from 'react-router-dom';

export default function Intro() {
  const navigate = useNavigate();
  return (
    <div
      className="relative h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg_two})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between flex-col h-full py-64">
        <div>
          <h1 className="text-white text-[200px] leading-tight font-bold font-roboto">
            To Do
          </h1>
          <p className="mt-4 text-4xl text-red-400 font-light text-center">
            Create And Manage <br /> Your Tasks Now.
          </p>
        </div>
        <button
          className="px-6 py-3 border text-white border-white rounded-md hover:bg-white hover:text-black"
          onClick={() => {
            navigate('/home');
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
