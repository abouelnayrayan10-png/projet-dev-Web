import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Materials from './pages/Materials';
import Reservations from './pages/Reservations';
import './App.css';

function App() {
  return (
    <Router>
      {/* Barre de navigation temporaire pour tester */}
      <nav style={{ padding: '1rem', background: '#eee', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Login</Link>
        <Link to="/materiel" style={{ marginRight: '10px' }}>Matériel</Link>
        <Link to="/reservations">Réservations</Link>
      </nav>

      {/* Le système de routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/materiel" element={<Materials />} />
        <Route path="/reservations" element={<Reservations />} />
      </Routes>
    </Router>
  );
}

export default App;