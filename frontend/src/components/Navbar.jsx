import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  // Style dynamique pour les liens
  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return {
      ...styles.link,
      ...(isActive ? styles.activeLink : {}),
    };
  };

  return (
    <nav style={styles.navbar}>
      {/* Conteneur interne pour aligner avec le reste du site */}
      <div style={styles.innerContainer}>
        
        {/* Logo avec effet Glow */}
        <div onClick={() => navigate("/home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "1.8rem" }}>⚡</span>
          <h1 style={styles.title}>FuturLab</h1>
        </div>

        {/* Menu de navigation */}
        <div style={styles.menu}>
          <Link style={getLinkStyle("/home")} to="/home">
            Accueil
          </Link>

          <Link style={getLinkStyle("/materials")} to="/materials">
            Matériel
          </Link>

          {role === "admin" && (
            <Link style={getLinkStyle("/reservations")} to="/reservations">
              Réservations
            </Link>
          )}

          <div style={styles.separator}></div>

          <button style={styles.logout} onClick={logout}>
            Déconnexion
          </button>
        </div>

      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    height: "80px",
    width: "100%",
    // Effet Verre (Glassmorphism)
    background: "rgba(10, 15, 31, 0.85)", 
    backdropFilter: "blur(12px)", 
    WebkitBackdropFilter: "blur(12px)", // Pour Safari
    borderBottom: "1px solid #00e1ff",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "center", // Centre le contenu
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
  },
  innerContainer: {
    width: "100%",
    maxWidth: "1200px", // S'aligne avec ton Layout
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
  },
  title: {
    color: "white",
    margin: 0,
    fontSize: "1.6rem",
    fontFamily: "'Segoe UI', sans-serif",
    fontWeight: "800",
    letterSpacing: "1px",
    background: "linear-gradient(45deg, #00e1ff, #ffffff)", // Dégradé sur le texte
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 0 20px rgba(0, 225, 255, 0.4)",
  },
  menu: {
    display: "flex",
    gap: "8px", 
    alignItems: "center",
  },
  link: {
    color: "#a0a0a0",
    textDecoration: "none",
    padding: "10px 16px",
    borderRadius: "12px", // Arrondi plus doux
    transition: "all 0.3s ease",
    fontSize: "0.95rem",
    fontWeight: "500",
    position: "relative",
  },
  activeLink: {
    color: "#00e1ff",
    backgroundColor: "rgba(0, 225, 255, 0.08)", // Fond très subtil
    fontWeight: "bold",
    boxShadow: "0 0 15px rgba(0, 225, 255, 0.1)", // Petite lueur
    border: "1px solid rgba(0, 225, 255, 0.2)",
  },
  separator: {
    width: "1px",
    height: "24px",
    backgroundColor: "#333",
    margin: "0 15px",
  },
  logout: {
    backgroundColor: "transparent",
    color: "#ff4d4d",
    border: "1px solid rgba(255, 77, 77, 0.3)",
    padding: "9px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.9rem",
    transition: "0.3s",
  },
};