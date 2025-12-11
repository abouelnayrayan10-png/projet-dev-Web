import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Materials from "./pages/Materials";
import Reservations from "./pages/Reservations";

import { isAuthenticated, isAdmin } from "./api/api";

// ---------------------------
// Route protégée : utilisateur connecté
// ---------------------------
function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" />;
}

// ---------------------------
// Route protégée : admin uniquement
// (tu peux encore l'utiliser si besoin)
// ---------------------------
function AdminRoute({ children }) {
  return isAuthenticated() && isAdmin() ? children : <Navigate to="/materials" />;
}

// ---------------------------
// APP PRINCIPALE
// ---------------------------
export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PAGE LOGIN */}
        <Route path="/" element={<Login />} />

        {/* PAGE MATÉRIEL — accessible à tous les utilisateurs connectés */}
        <Route
          path="/materials"
          element={
            <PrivateRoute>
              <Materials />
            </PrivateRoute>
          }
        />

        {/* PAGE RÉSERVATIONS — accessible à TOUS LES UTILISATEURS CONNECTÉS */}
        <Route
          path="/reservations"
          element={
            <PrivateRoute>
              <Reservations />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
