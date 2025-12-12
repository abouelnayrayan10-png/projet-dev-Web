import { useState } from "react";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await login(email, password);

      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.role);

      navigate("/home");
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0a0f1f, #0b0d14)",
        fontFamily: "'Poppins', sans-serif"
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          padding: "40px",
          borderRadius: "12px",
          width: "350px",
          textAlign: "center",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0px 0px 25px rgba(0,255,255,0.2)"
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            color: "#00eaff",
            fontWeight: "600",
            fontSize: "26px"
          }}
        >
          Connexion
        </h2>

        {error && <p style={{ color: "#ff4f4f", marginBottom: "10px" }}>{error}</p>}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              fontSize: "15px"
            }}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              fontSize: "15px"
            }}
          />

          <button
            type="submit"
            style={{
              marginTop: "10px",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: "#00eaff",
              color: "#000",
              fontWeight: "600",
              fontSize: "16px",
              transition: "0.2s"
            }}
            onMouseOver={(e) => (e.target.style.background = "#00bcd4")}
            onMouseOut={(e) => (e.target.style.background = "#00eaff")}
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
