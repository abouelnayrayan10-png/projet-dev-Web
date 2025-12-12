import Navbar from "./Navbar"; 

export default function Layout({ children }) {
  return (
    <div style={styles.container}>
      
      {/* La Navbar prend toute la largeur en haut */}
      <Navbar />

      {/* Le contenu de la page est centré et prend toute la place */}
      <main style={styles.main}>
        {children}
      </main>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#121212", // Fond sombre global
    display: "flex",
    flexDirection: "column",
  },
  main: {
    width: "100%",
    maxWidth: "1200px", // On limite la largeur pour que ce soit joli sur grand écran
    margin: "0 auto",   // On centre le contenu horizontalement
    padding: "40px 20px", // Un peu d'espace autour
    flex: 1, // Prend toute la hauteur restante
  }
};