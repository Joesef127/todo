import Intro from "pages/Intro";
import Home from "pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "pages/Login";

export default function App() {
  const [username, setUsername] = useState<string>(
    JSON.parse(localStorage.getItem("username") || '""')
  );

  const handleUsername = (name: string) => {
    if (name.trim()) {
      localStorage.setItem("username", JSON.stringify(name));
      setUsername(name);
    } 
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro handleUsername={handleUsername} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home username={username} />} />
      </Routes>
    </Router>
  );
}
