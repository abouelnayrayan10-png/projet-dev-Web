import { useEffect, useState, useRef } from "react";
import {
  fetchReservations,
  createReservation,
  deleteReservation,
} from "../api/api";
import Table from "../components/Table";
import { useSearchParams } from "react-router-dom";

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [materialId, setMaterialId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const role = localStorage.getItem("role");
  const [searchParams] = useSearchParams();
  const autoMaterialId = searchParams.get("materialId");

  // 🔥 Empêcher le double load (cause du bug de duplication)
  const firstLoad = useRef(true);

  async function loadReservations() {
    try {
      setLoading(true);
      const data = await fetchReservations();
      setReservations(data);
    } catch (err) {
      setError("Impossible de charger les réservations.");
    } finally {
      setLoading(false);
    }
  }

  // 🔥 Chargement PROPRE : 1 seule fois
  useEffect(() => {
    if (!firstLoad.current) return;
    firstLoad.current = false;

    loadReservations();
  }, []);

  // Auto-remplissage du matériel
  useEffect(() => {
    if (autoMaterialId) {
      setMaterialId(autoMaterialId);
    }
  }, [autoMaterialId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!materialId || !startDate || !endDate) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    try {
      await createReservation(Number(materialId), startDate, endDate);

      setMaterialId("");
      setStartDate("");
      setEndDate("");

      await loadReservations();
    } catch (err) {
      setError("Erreur lors de la création de la réservation.");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteReservation(id);
      await loadReservations();
    } catch (err) {
      alert("Erreur suppression de la réservation");
    }
  }

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Utilisateur", accessor: "userId" },
    { header: "Matériel", accessor: "materialId" },
    { header: "Début", accessor: "startDate" },
    { header: "Fin", accessor: "endDate" },
  ];

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>
        {role === "admin" ? "Toutes les réservations" : "Mes réservations"}
      </h2>

      {loading && <p>Chargement...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {/* TABLE FUTURISTE */}
      <Table
        columns={columns}
        data={reservations}
        renderActions={(row) =>
          role === "admin" ? (
            <button
              onClick={() => handleDelete(row.id)}
              style={styles.deleteBtn}
            >
              Supprimer
            </button>
          ) : null
        }
      />

      {/* FORMULAIRE DE RÉSERVATION */}
      <h3 style={styles.subtitle}>Créer une réservation</h3>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="number"
          placeholder="ID matériel"
          value={materialId}
          onChange={(e) => setMaterialId(e.target.value)}
          style={styles.input}
        />

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={styles.input}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.submitBtn}>
          Réserver
        </button>
      </form>
    </div>
  );
}

// --------------------------------------------------------
// 🔥 STYLES FUTURISTES
// --------------------------------------------------------
const styles = {
  container: {
    maxWidth: "900px",
    margin: "20px auto",
    color: "#d8eeff",
    fontFamily: "Poppins, sans-serif",
  },
  title: {
    color: "#00eaff",
    fontSize: "28px",
    textAlign: "center",
    marginBottom: "20px",
    textShadow: "0 0 10px #00eaff",
  },
  subtitle: {
    color: "#b8d8ff",
    fontSize: "20px",
    marginTop: "30px",
  },
  error: {
    color: "#ff4f4f",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #00e1ff55",
    background: "rgba(255,255,255,0.05)",
    color: "white",
  },
  submitBtn: {
    padding: "10px 20px",
    background: "#00eaff",
    color: "#00111a",
    borderRadius: "8px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "6px 12px",
    background: "#e74c3c",
    color: "white",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
};
