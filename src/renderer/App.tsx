import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LinkSync from './components/LinkSync';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LinkSync tempo={120} />} />
      </Routes>
    </Router>
  );
}
