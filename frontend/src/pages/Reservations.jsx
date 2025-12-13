import { useEffect, useState, useRef } from "react";
import {
  fetchReservations,
  fetchMaterials,
  createReservation,
  deleteReservation,
  updateReservation,
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
  const [materials, setMaterials] = useState([]);


  // 🔥 Édition (USER)
  const [editId, setEditId] = useState(null);
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");

  const role = localStorage.getItem("role");
  const [searchParams] = useSearchParams();
  const autoMaterialId = searchParams.get("materialId");

  // 🔥 Empêcher le double load
  const firstLoad = useRef(true);

 async function loadReservations() {
  try {
    setLoading(true);

    const [resData, matData] = await Promise.all([
      fetchReservations(),
      fetchMaterials(),
    ]);

    setReservations(resData);
    setMaterials(matData);
  } catch (err) {
    setError("Impossible de charger les réservations.");
  } finally {
    setLoading(false);
  }
}


  useEffect(() => {
    if (!firstLoad.current) return;
    firstLoad.current = false;
    loadReservations();
  }, []);

  // Auto-remplissage depuis matériel
  useEffect(() => {
    if (autoMaterialId) {
      setMaterialId(autoMaterialId);
    }
  }, [autoMaterialId]);

  // ------------------------
  // CRÉATION
  // ------------------------
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

  // ------------------------
  // SUPPRESSION / ANNULATION
  // ------------------------
  async function handleDelete(id) {
    try {
      await deleteReservation(id);
      await loadReservations();
    } catch (err) {
      alert("Erreur suppression de la réservation");
    }
  }

  // ------------------------
  // MODIFICATION (USER)
  // ------------------------
  async function handleUpdate(id) {
    try {
      await updateReservation(id, editStartDate, editEndDate);
      setEditId(null);
      await loadReservations();
    } catch (err) {
      alert("Erreur modification réservation");
    }
  }
function getMaterialName(materialId) {
  const material = materials.find((m) => m.id === materialId);
  return material ? material.name : "Inconnu";
}

  // ------------------------
  // COLONNES
  // ------------------------
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Utilisateur", accessor: "userId" },
    {
  header: "Matériel",
  accessor: "materialId",
  cell: (value) => getMaterialName(value),
},
,
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

      <Table
        columns={columns}
        data={reservations}
        renderActions={(row) => {
          // ✏️ MODE ÉDITION (USER)
          if (editId === row.id) {
            return (
              <div style={{ display: "flex", gap: "6px" }}>
                <input
                  type="date"
                  value={editStartDate}
                  onChange={(e) => setEditStartDate(e.target.value)}
                />
                <input
                  type="date"
                  value={editEndDate}
                  onChange={(e) => setEditEndDate(e.target.value)}
                />
                <button
                  onClick={() => handleUpdate(row.id)}
                  style={styles.saveBtn}
                >
                  ✔
                </button>
                <button
                  onClick={() => setEditId(null)}
                  style={styles.cancelBtn}
                >
                  ✖
                </button>
              </div>
            );
          }

          // 👑 ADMIN
          if (role === "admin") {
            return (
              <button
                onClick={() => handleDelete(row.id)}
                style={styles.deleteBtn}
              >
                Supprimer
              </button>
            );
          }

          // 👤 USER
          return (
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => {
                  setEditId(row.id);
                  setEditStartDate(row.startDate);
                  setEditEndDate(row.endDate);
                }}
                style={styles.editBtn}
              >
                Modifier
              </button>

              <button
                onClick={() => handleDelete(row.id)}
                style={styles.deleteBtn}
              >
                Annuler
              </button>
            </div>
          );
        }}
      />

      {/* FORMULAIRE CRÉATION */}
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

// ------------------------
// STYLES
// ------------------------
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
  editBtn: {
    background: "#3498db",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#e74c3c",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  saveBtn: {
    background: "#2ecc71",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cancelBtn: {
    background: "#555",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
