import { NavLink, useNavigate } from 'react-router-dom';
import task from '../assets/icons/task.png';
import { useContext, useState } from 'react';
import { LoginContext } from 'App';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  return (
    <nav className="p-4 bg-white shadow-md flex items-center justify-center mx-auto w-full">
      <div className="absolute top-24 left-auto text-red-400 text-lg">
        {error ? error : null}
      </div>
      <div className="max-w-lg w-full flex items-center justify-between">
        <div className="flex gap-1 items-center justify-center">
          <h1 className="text-2xl font-bold">To Do</h1>
          <span>
            <img src={task} alt="logo" className="w-6" />
          </span>
        </div>
        <div>
          <NavLink
            to={loggedIn ? '/home' : '#'}
            onClick={(e) => (loggedIn ? null : setError(`Login to access ${e.currentTarget.textContent} page!`))}
            className="mr-3 px-4 py-1 border text-black border-black rounded-lg hover:bg-black hover:text-white transition ease-in-out duration-300"
          >
            Home
          </NavLink>
          {loggedIn ? (
            <NavLink
              to={'/login'}
              onClick={() => {
                setLoggedIn(false);
                localStorage.clear();
              }}
              className="px-4 py-1 border text-black border-black rounded-lg hover:bg-black hover:text-white transition ease-in-out duration-300"
            >
              Logout
            </NavLink>
          ) : (
            <NavLink
              to={'/login'}
              className="px-4 py-1 border text-black border-black rounded-lg hover:bg-black hover:text-white transition ease-in-out duration-300"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
