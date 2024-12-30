import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-white shadow-md">
      <h1 className="text-2xl font-bold">To-Do App</h1>
      <button onClick={() => navigate(-1)} className="px-4 py-1 border text-black border-black rounded-full hover:bg-black hover:text-white transition ease-in-out duration-300">
        Back
      </button>
    </nav>
  )
}