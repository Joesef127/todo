import Intro from "pages/Intro";
import Home from "pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}
