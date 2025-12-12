import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      {/* Titre / Logo */}
      <div style={styles.header}>
        <h2 style={styles.title}>Sweepy Shop</h2>
        <div style={styles.divider}></div>
      </div>

      {/* Navigation */}
      <nav style={styles.nav}>
        <SidebarLink to="/home" icon="🏠" label="Accueil" />
        <SidebarLink to="/materials" icon="📦" label="Matériel" />
        <SidebarLink to="/reservations" icon="📅" label="Réservations" />
      </nav>
      
      {/* Petit footer stylé en bas (optionnel) */}
      <div style={styles.footer}>
        <span style={{opacity: 0.5, fontSize: "0.8rem"}}>v1.0.0</span>
      </div>
    </div>
  );
}

// --- Composant interne pour gérer le Hover et l'Active state ---
function SidebarLink({ to, icon, label }) {
  const location = useLocation();
  const [hover, setHover] = useState(false);

  // Vérifie si le lien correspond à la page actuelle
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      style={{
        ...styles.link,
        ...(isActive ? styles.activeLink : {}),
        ...(hover && !isActive ? styles.hoverLink : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span style={styles.icon}>{icon}</span>
      {label}
    </Link>
  );
}

// --- STYLES ---
const styles = {
  sidebar: {
    width: "260px", // Largeur fixe
    height: "100vh",
    background: "#0a0f1f", // Même fond sombre que le reste
    borderRight: "1px solid #1e2538", // Bordure discrète
    padding: "30px 20px",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    zIndex: 200, // Au-dessus du reste si besoin
    boxShadow: "4px 0 15px rgba(0, 0, 0, 0.3)",
  },
  header: {
    marginBottom: "40px",
    textAlign: "center",
  },
  title: {
    color: "#00e1ff",
    margin: "0 0 15px 0",
    fontFamily: "'Orbitron', sans-serif", // Police futuriste si dispo
    letterSpacing: "1.5px",
    fontSize: "1.5rem",
    textShadow: "0 0 10px rgba(0, 225, 255, 0.4)",
  },
  divider: {
    height: "2px",
    width: "50px",
    background: "#00e1ff",
    margin: "0 auto",
    borderRadius: "2px",
    boxShadow: "0 0 8px #00e1ff",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: 1, // Pousse le footer vers le bas
  },
  link: {
    display: "flex",
    alignItems: "center",
    color: "#a0a0a0", // Gris clair par défaut
    textDecoration: "none",
    fontSize: "1rem",
    padding: "12px 20px",
    borderRadius: "12px",
    transition: "all 0.2s ease",
    fontWeight: "500",
    border: "1px solid transparent", // Pour éviter le saut lors du hover
  },
  // Style quand la souris passe dessus
  hoverLink: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "white",
    transform: "translateX(5px)", // Petit mouvement vers la droite
  },
  // Style quand on est sur la page
  activeLink: {
    backgroundColor: "rgba(0, 225, 255, 0.1)", // Fond bleu transparent
    color: "#00e1ff", // Texte néon
    border: "1px solid rgba(0, 225, 255, 0.3)",
    fontWeight: "bold",
    boxShadow: "0 0 15px rgba(0, 225, 255, 0.1)",
  },
  icon: {
    marginRight: "15px",
    fontSize: "1.2rem",
  },
  footer: {
    textAlign: "center",
    color: "#444",
    paddingTop: "20px",
    borderTop: "1px solid #1e2538",
  }
};