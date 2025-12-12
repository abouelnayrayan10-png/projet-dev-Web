import { Link } from 'react-router-dom';

export default function Home() {
  // On récupère le rôle (avec une valeur par défaut si vide)
  const role = localStorage.getItem("role") || "Utilisateur";

  return (
    <div style={styles.container}>
      
      {/* En-tête de la page */}
      <header style={styles.header}>
        <h1 style={styles.title}>Bienvenue 👋</h1>
        <p style={styles.subtitle}>
          Vous êtes connecté en tant que : <span style={styles.roleBadge}>{role}</span>
        </p>
      </header>

      {/* Grille de navigation (Cartes) */}
      <div style={styles.grid}>
        
        {/* Carte Matériel */}
        <Link to="/materials" style={styles.link}>
          <div style={styles.card}>
            <div style={styles.icon}>🖥️</div>
            <h3 style={styles.cardTitle}>Matériel</h3>
            <p style={styles.cardText}>Consulter le stock</p>
          </div>
        </Link>

        {/* Carte Réservations */}
        <Link to="/reservations" style={styles.link}>
          <div style={styles.card}>
            <div style={styles.icon}>📅</div>
            <h3 style={styles.cardTitle}>Réservations</h3>
            <p style={styles.cardText}>Suivre mes demandes</p>
          </div>
        </Link>

        {/* Carte Profil / Déconnexion */}
        <Link to="/" style={styles.link}>
          <div style={{...styles.card, borderColor: '#ff4d4d'}}> {/* Bordure rouge pour la déconnexion */}
            <div style={styles.icon}>🚪</div>
            <h3 style={{...styles.cardTitle, color: '#ff4d4d'}}>Déconnexion</h3>
            <p style={styles.cardText}>Retour à l'accueil</p>
          </div>
        </Link>

      </div>
    </div>
  );
}

// --- Styles CSS (Thème Sombre & Néon) ---
const styles = {
  container: {
    minHeight: '80vh', // Prend de la place en hauteur
    padding: '40px',
    backgroundColor: '#121212', // Fond très sombre
    color: 'white',
    fontFamily: 'Segoe UI, sans-serif',
    textAlign: 'center',
  },
  header: {
    marginBottom: '50px',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '10px',
    color: '#00e1ff', // ✅ Ton Bleu Néon conservé
    textShadow: '0 0 10px rgba(0, 225, 255, 0.5)', // Petit effet lumineux
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#ccc',
  },
  roleBadge: {
    backgroundColor: 'rgba(0, 225, 255, 0.1)',
    color: '#00e1ff',
    padding: '5px 10px',
    borderRadius: '5px',
    fontWeight: 'bold',
    border: '1px solid #00e1ff',
    marginLeft: '5px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Responsive automatique
    gap: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  link: {
    textDecoration: 'none',
  },
  card: {
    backgroundColor: '#1e1e1e', // Carte gris foncé
    padding: '30px',
    borderRadius: '15px',
    border: '1px solid #333',
    transition: 'transform 0.2s, border-color 0.2s',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
  },
  icon: {
    fontSize: '2.5rem',
  },
  cardTitle: {
    fontSize: '1.5rem',
    margin: '0',
    color: '#fff',
  },
  cardText: {
    color: '#888',
    fontSize: '0.9rem',
    margin: '0',
  }
};