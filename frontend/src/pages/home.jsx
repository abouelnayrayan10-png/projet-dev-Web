export default function Home() {
  const role = localStorage.getItem("role");

  return (
    <div>
      <h1 style={{ color: "#00e1ff" }}>Bienvenue 👋</h1>
      <p style={{ color: "white" }}>
        Vous êtes connecté en tant que : <strong>{role}</strong>
      </p>
    </div>
  );
}
