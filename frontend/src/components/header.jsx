import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <header style={styles.header}>
      <h1 style={styles.title}>⚡ FuturLab — Gestion du Matériel</h1>

      <nav style={styles.nav}>
        <Link style={styles.link} to="/materials">Matériel</Link>

        {role === "admin" && (
          <Link style={styles.link} to="/reservations">Réservations</Link>
        )}

        <button style={styles.logout} onClick={logout}>
          Déconnexion
        </button>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    background: "linear-gradient(90deg, #0a0f1f, #111a33, #0a0f1f)",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #00e1ff",
    boxShadow: "0 0 20px #00e1ff55",
  },
  title: {
    color: "#00e1ff",
    margin: 0,
    fontFamily: "Orbitron, sans-serif",
    letterSpacing: "2px",
  },
  nav: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "#b9dfff",
    textDecoration: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    border: "1px solid #00e1ff55",
    transition: "0.2s",
  },
  logout: {
    backgroundColor: "#ff003c",
    color: "white",
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    transition: "0.2s",
  },
};
