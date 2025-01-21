import Intro from 'pages/Intro';
import Home from 'pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';
import Login from 'pages/Login';
import { baseUrl } from './utils/utils';
import axios from 'axios';
import Register from 'pages/Register';

export const LoginContext = createContext();

export default function App() {
  const [username, setUsername] = useState<string>(
    JSON.parse(localStorage.getItem('username') || '""')
  );
  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);

  useEffect(() => {
    const minute = 1000 * 60;
    setInterval(() => {
      const url = `${baseUrl}api/token/refresh/`;
      const refreshToken = { refresh: localStorage.refresh };

      if (refreshToken.refresh) {
        axios
          .post(url, refreshToken, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((response) => {
            localStorage.access = response.data.access;
            localStorage.refresh = response.data.refresh;
            setLoggedIn(true);
          })
          .catch((error) => {
            console.log('error fetching refresh token', error);
          });
      }
    }, minute * 3);
  }, []);

  const changeLoggedIn = (value: boolean) => {
    setLoggedIn(value);
    if (value === false) {
      localStorage.removeItem('access');
    }
  };

  const handleUsername = (name: string) => {
    if (name.trim()) {
      const url = `${baseUrl}`
      setUsername(name);
    }
  };

  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <Router>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home username={username} />} />
        </Routes>
      </Router>
    </LoginContext.Provider>
  );
}
