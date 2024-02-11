import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import Hello from '../pages/Hello';
import Notes from '../pages/Notes';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </Router>
  );
}
