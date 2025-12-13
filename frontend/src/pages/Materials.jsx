import { useEffect, useState } from "react";
import {
  fetchMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from "../api/api";

import Table from "../components/Table";
import { useNavigate } from "react-router-dom";

export default function Materials() {
  // --- ÉTATS ---
  const [materials, setMaterials] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  // Formulaire
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editId, setEditId] = useState(null);

  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  // --- CHARGEMENT ---
  async function loadMaterials() {
    try {
      const data = await fetchMaterials();
      setMaterials(data);
    } catch (err) {
      setError("Impossible de charger le matériel");
    }
  }

  useEffect(() => {
    loadMaterials();
  }, []);

  // --- FILTRE ---
  const filteredMaterials = materials.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- ACTIONS ---
  function handleReserve(materialId) {
    navigate("/reservations?materialId=" + materialId);
  }

  async function handleCreate(e) {
    e.preventDefault();

    if (!name || quantity === "") {
      setError("Tous les champs sont obligatoires");
      return;
    }

    try {
      await createMaterial(name, Number(quantity));
      resetForm();
      await loadMaterials();
    } catch (err) {
      setError("Erreur lors de la création");
    }
  }

  async function handleUpdate() {
    if (!editId) return;

    try {
      await updateMaterial(editId, name, Number(quantity));
      resetForm();
      await loadMaterials();
    } catch (err) {
      setError("Erreur mise à jour");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteMaterial(id);
      await loadMaterials();
    } catch (err) {
      setError("Erreur suppression");
    }
  }

  function resetForm() {
    setEditId(null);
    setName("");
    setQuantity("");
    setError("");
  }

  // --- COLONNES ---
  const columns = [
  { header: "ID", accessor: "id" },
  { header: "Nom", accessor: "name" },
  { header: "Quantité", accessor: "quantity" },
  {
    header: "Disponible",
    accessor: "available",
    cell: (value, row) => {
      const canReserve = row.quantity > 0;

      return (
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {canReserve ? (
            <span style={{ color: "#2ecc71", fontWeight: "bold" }}>
              Oui ({row.quantity})
            </span>
          ) : (
            <span style={{ color: "#e74c3c", fontWeight: "bold" }}>
              Non
            </span>
          )}

          <button
            onClick={() => handleReserve(row.id)}
            disabled={!canReserve}
            style={{
              backgroundColor: canReserve ? "#2ecc71" : "#444",
              color: canReserve ? "white" : "#888",
              border: "none",
              borderRadius: "5px",
              padding: "6px 12px",
              cursor: canReserve ? "pointer" : "not-allowed",
              fontWeight: "bold",
              fontSize: "0.85rem",
            }}
          >
            {canReserve ? "Réserver" : "Indisp."}
          </button>
        </div>
      );
    },
  },
];


  // --- RENDU ---
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Gestion du matériel</h2>

      {error && <div style={errorStyle}>{error}</div>}

      <input
        type="text"
        placeholder="🔍 Rechercher un équipement..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={searchStyle}
      />

      <Table
  columns={columns}
  data={filteredMaterials}
  {...(role === "admin" && {
    renderActions: (row) => (
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => {
            setEditId(row.id);
            setName(row.name);
            setQuantity(row.quantity);
          }}
          style={actionButtonStyle("#3498db")}
          title="Modifier"
        >
          ✏️
        </button>

        <button
          onClick={() => handleDelete(row.id)}
          style={actionButtonStyle("#e74c3c")}
          title="Supprimer"
        >
          🗑️
        </button>
      </div>
    ),
  })}
/>


      {role === "admin" && (
        <div style={formContainerStyle}>
          <h3 style={{ color: "#00e1ff" }}>
            {editId ? "Modifier un matériel" : "Ajouter un équipement"}
          </h3>

          <form
            onSubmit={editId ? handleUpdate : handleCreate}
            style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
          >
            <input
              type="text"
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Quantité"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={inputStyle}
            />

            <button type="submit" style={submitStyle}>
              {editId ? "Mettre à jour" : "Ajouter"}
            </button>

            {editId && (
              <button type="button" onClick={resetForm} style={cancelStyle}>
                Annuler
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

/* ---------- STYLES ---------- */

const containerStyle = {
  maxWidth: "1000px",
  margin: "40px auto",
  color: "white",
  fontFamily: "Segoe UI, sans-serif",
};

const titleStyle = {
  marginBottom: "20px",
  color: "#00e1ff",
  borderBottom: "1px solid #333",
  paddingBottom: "10px",
};

const errorStyle = {
  color: "#ff4d4d",
  marginBottom: "15px",
};

const searchStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #333",
  backgroundColor: "#1e1e1e",
  color: "white",
};

const formContainerStyle = {
  marginTop: "30px",
  padding: "20px",
  backgroundColor: "#1e1e1e",
  borderRadius: "10px",
  border: "1px solid #333",
};

const inputStyle = {
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid #444",
  backgroundColor: "#2c2c2c",
  color: "white",
};

const submitStyle = {
  backgroundColor: "#00e1ff",
  color: "#121212",
  fontWeight: "bold",
  padding: "8px 20px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const cancelStyle = {
  background: "transparent",
  color: "#888",
  border: "1px solid #555",
  padding: "8px 15px",
  borderRadius: "6px",
  cursor: "pointer",
};

const actionButtonStyle = (color) => ({
  backgroundColor: color,
  color: "white",
  borderRadius: "6px",
  padding: "8px 12px",
  border: "none",
  cursor: "pointer",
});
