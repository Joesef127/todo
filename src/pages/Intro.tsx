import { useState } from 'react';
import bg_two from '../assets/images/bg_two.jpg';
import { useLocation, useNavigate } from 'react-router-dom';

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
      <div className="relative z-10 flex items-center justify-between gap-8 flex-col h-full py-60">
        <div>
          <h1 className="text-white text-[200px] max-sm:text-8xl leading-tight font-bold font-roboto ">
            To Do
          </h1>
          <p className="mt-3 text-4xl max-sm:text-2xl text-red-400 font-light text-center">
            Create And Manage <br /> Your Tasks Now.
          </p>
        </div>
        <button
          type="submit"
          className="my-4 px-24 py-3 border text-white border-white rounded-full hover:bg-white hover:text-black transition ease-in-out duration-300"
          onClick={() => {navigate('/login')}}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
