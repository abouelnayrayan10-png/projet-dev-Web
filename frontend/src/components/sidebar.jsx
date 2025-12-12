import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>📦 Matériel</h2>

      <nav style={styles.nav}>
        <Link to="/materials" style={styles.link}>🏠 Accueil</Link>
        <Link to="/materials" style={styles.link}>📁 Matériel</Link>
        <Link to="/reservations" style={styles.link}>📅 Réservations</Link>
      </nav>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    height: "100vh",
    background: "#0c0f21",
    borderRight: "2px solid #00e1ff33",
    padding: "20px",
    position: "fixed",
    top: 0,
    left: 0,
  },
  title: {
    color: "#00e1ff",
    marginBottom: "30px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  link: {
    color: "#d8eeff",
    textDecoration: "none",
    fontSize: "18px",
  }
};
