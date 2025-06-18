import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import KnapsackPage from './pages/KnapsackPage';
import AssignmentPage from './pages/AssignmentPage';

export default function App() {
  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-white to-cyan-50 text-gray-800">
      <nav className="mb-4 space-x-4 text-teal-600">
        <Link to="/">Home</Link>
        <Link to="/knapsack">Knapsack</Link>
        <Link to="/assignment">Assignment</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/knapsack" element={<KnapsackPage />} />
        <Route path="/assignment" element={<AssignmentPage />} />
      </Routes>
    </div>
  );
}
