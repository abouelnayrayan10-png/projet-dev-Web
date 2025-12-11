import { useEffect, useState } from "react";
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

  const role = localStorage.getItem("role"); // "user" ou "admin"

  const [searchParams] = useSearchParams();
  const autoMaterialId = searchParams.get("materialId");

  // Auto-remplir le matériel si on arrive depuis "Réserver"
  useEffect(() => {
    if (autoMaterialId) {
      setMaterialId(autoMaterialId);
    }
  }, [autoMaterialId]);

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

  useEffect(() => {
    loadReservations();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!materialId || !startDate || !endDate) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    try {
      await createReservation(Number(materialId), startDate, endDate);

      // vider le formulaire
      setMaterialId("");
      setStartDate("");
      setEndDate("");

      // recharger la liste
      await loadReservations();
    } catch (err) {
      // message générique côté front
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
    { header: "ID utilisateur", accessor: "userId" },
    { header: "ID matériel", accessor: "materialId" },
    { header: "Début", accessor: "startDate" },
    { header: "Fin", accessor: "endDate" },
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h2>
        {role === "admin" ? "Toutes les réservations" : "Mes réservations"}
      </h2>

      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Table
        columns={columns}
        data={reservations}
        renderActions={(row) =>
          role === "admin" ? (
            <button
              onClick={() => handleDelete(row.id)}
              style={{
                backgroundColor: "#e74c3c",
                color: "white",
                borderRadius: "6px",
                padding: "6px 12px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Supprimer
            </button>
          ) : null
        }
      />

      <h3 style={{ marginTop: "20px" }}>Créer une réservation</h3>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "8px", alignItems: "center" }}
      >
        <input
          type="number"
          placeholder="ID matériel"
          value={materialId}
          onChange={(e) => setMaterialId(e.target.value)}
        />

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button type="submit">Réserver</button>
      </form>
    </div>
  );
}
