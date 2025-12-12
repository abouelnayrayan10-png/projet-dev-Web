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

  // États du formulaire
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(""); 
  const [available, setAvailable] = useState(true);
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

  // --- FILTRE RECHERCHE ---
  const filteredMaterials = materials.filter((material) =>
    material.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- ACTIONS ---
  function handleReserve(materialId) {
    navigate("/reservations?materialId=" + materialId);
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!name || !categoryId) {
      setError("Tous les champs sont obligatoires");
      return;
    }
    try {
      await createMaterial(name, categoryId, available);
      resetForm();
      await loadMaterials();
    } catch (err) {
      setError("Erreur lors de la création");
    }
  }

  async function handleUpdate() {
    if (!editId) return;
    try {
      await updateMaterial(editId, name, categoryId, available);
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
    setCategoryId("");
    setAvailable(true);
    setError("");
  }

  // --- COLONNES ---
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Nom", accessor: "name" },
    { header: "Catégorie", accessor: "categoryId" },
    {
      header: "Disponible",
      accessor: "available",
      cell: (value, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {value ? (
            <span style={{ color: "#2ecc71", fontWeight: "bold", minWidth: "40px" }}>Oui</span>
          ) : (
            <span style={{ color: "#e74c3c", fontWeight: "bold", minWidth: "40px" }}>Non</span>
          )}

          <button
            onClick={() => handleReserve(row.id)}
            disabled={!value}
            style={{
              backgroundColor: value ? "#2ecc71" : "#444",
              color: value ? "white" : "#888",
              border: "none",
              borderRadius: "5px",
              padding: "6px 12px",
              cursor: value ? "pointer" : "not-allowed",
              fontWeight: "bold",
              fontSize: "0.85rem",
              transition: "0.2s"
            }}
          >
            {value ? "Réserver" : "Indisp."}
          </button>
        </div>
      ),
    },
  ];

  // --- RENDU ---
  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", color: "white", fontFamily: "Segoe UI, sans-serif" }}>
      <h2 style={{ marginBottom: "20px", color: "#00e1ff", borderBottom: "1px solid #333", paddingBottom: "10px" }}>
        Gestion du matériel
      </h2>

      {error && <div style={{ color: "#ff4d4d", marginBottom: "15px", backgroundColor: "rgba(255, 77, 77, 0.1)", padding: "10px", borderRadius: "5px" }}>{error}</div>}

      <input
        type="text"
        placeholder="🔍 Rechercher un équipement..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #333",
          backgroundColor: "#1e1e1e",
          color: "white",
          fontSize: "1rem",
          outline: "none",
        }}
      />

      <Table
        columns={columns}
        data={filteredMaterials}
        renderActions={(row) =>
          role === "admin" ? (
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => {
                  setEditId(row.id);
                  setName(row.name);
                  setCategoryId(row.categoryId);
                  setAvailable(row.available);
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
          ) : null
        }
      />

      {role === "admin" && (
        <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "#1e1e1e", borderRadius: "10px", border: "1px solid #333" }}>
          <h3 style={{ color: "#00e1ff", marginTop: 0, marginBottom: "15px", fontSize: "1.1rem" }}>
            {editId ? "Modifier un matériel" : "Ajouter un nouvel équipement"}
          </h3>

          <form
            onSubmit={editId ? handleUpdate : handleCreate}
            style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}
          >
            {/* Champ NOM : Largeur fixe */}
            <div style={{ width: "300px" }}>
              <input
                type="text"
                placeholder="Nom de l'équipement"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Champ CATÉGORIE : Petit */}
            <div style={{ width: "100px" }}>
              <input
                type="number"
                placeholder="ID Cat."
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                style={inputStyle}
                min="0"
              />
            </div>

            {/* Champ DISPONIBLE : Ajusté */}
            <div style={{ width: "140px" }}>
              <select
                value={available ? "true" : "false"}
                onChange={(e) => setAvailable(e.target.value === "true")}
                style={inputStyle}
              >
                <option value="true">Disponible</option>
                <option value="false">Indisponible</option>
              </select>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#00e1ff",
                color: "#121212",
                fontWeight: "bold",
                padding: "8px 20px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "0.2s",
                height: "38px"
              }}
            >
              {editId ? "Mettre à jour" : "Ajouter"}
            </button>
            
            {editId && (
              <button 
                type="button" 
                onClick={resetForm}
                style={{ background: "transparent", color: "#888", border: "1px solid #555", padding: "8px 15px", borderRadius: "6px", cursor: "pointer", height: "38px"}}
              >
                Annuler
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

// --- STYLES UTILITAIRES ---
const inputStyle = {
  width: "100%",
  padding: "8px 12px", // Moins haut
  borderRadius: "6px",
  border: "1px solid #444",
  backgroundColor: "#2c2c2c",
  color: "white",
  fontSize: "0.9rem",
  outline: "none",
  height: "38px", // Hauteur fixe alignée avec le bouton
  boxSizing: "border-box"
};

const actionButtonStyle = (color) => ({
  backgroundColor: color,
  color: "white",
  borderRadius: "6px",
  padding: "8px 12px",
  border: "none",
  cursor: "pointer",
  fontSize: "1rem",
  transition: "opacity 0.2s"
});