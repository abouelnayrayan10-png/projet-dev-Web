import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={styles.nav}>
      <Link to="/" style={styles.home}>🏠</Link>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
        style={styles.logout}
      >
        🔓 Déconnexion
      </button>
    </div>
  );
}

const styles = {
  nav: {
    width: "100%",
    background: "#0c0f21",
    padding: "10px 20px",
    borderBottom: "2px solid #00e1ff33",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    height: "60px",
  },
  home: {
    color: "#00e1ff",
    fontSize: "26px",
    marginRight: "auto",
    textDecoration: "none",
  },
  logout: {
    background: "#e74c3c",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  }
};
