import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Materials from "./pages/Materials";
import Reservations from "./pages/Reservations";
import { isAuthenticated, isAdmin } from "./api/api";

// Route protégée : nécessite être connecté
function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" />;
}

// Route protégée admin uniquement
function AdminRoute({ children }) {
  return isAuthenticated() && isAdmin() ? children : <Navigate to="/materials" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PAGE LOGIN */}
        <Route path="/" element={<Login />} />

        {/* PAGE MATÉRIEL : utilisateur connecté */}
        <Route
          path="/materials"
          element={
            <PrivateRoute>
              <Materials />
            </PrivateRoute>
          }
        />

        {/* PAGE RÉSERVATIONS : admin uniquement */}
        <Route
          path="/reservations"
          element={
            <AdminRoute>
              <Reservations />
            </AdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
