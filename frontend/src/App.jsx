import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Materials from "./pages/Materials";
import Reservations from "./pages/Reservations";

import Layout from "./components/Layout";
import { isAuthenticated, isAdmin } from "./api/api";


// ===============
// ROUTES PRIVÉES
// ===============

// Accessible UNIQUEMENT si connecté
function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" />;
}

// Accessible uniquement si ADMIN
function AdminRoute({ children }) {
  return isAuthenticated() && isAdmin() ? children : <Navigate to="/home" />;
}



// ==========================
// APP PRINCIPALE
// ==========================

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* --- PAGE LOGIN --- */}
        <Route path="/" element={<Login />} />


        {/* --- PAGES AVEC LAYOUT (sidebar + navbar) --- */}

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Layout>
                <Home />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/materials"
          element={
            <PrivateRoute>
              <Layout>
                <Materials />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/reservations"
          element={
            <PrivateRoute>
              <Layout>
                <Reservations />
              </Layout>
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
