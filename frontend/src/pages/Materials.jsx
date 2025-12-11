import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from "../api/api";
import Table from "../components/Table";

export default function Materials() {
  const [materials, setMaterials] = useState([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [available, setAvailable] = useState(true);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // user / admin

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

  async function handleCreate(e) {
    e.preventDefault();
    if (!name || !categoryId) {
      setError("Tous les champs sont obligatoires");
      return;
    }
    try {
      await createMaterial(name, Number(categoryId), available);
      setName("");
      setCategoryId("");
      setAvailable(true);
      await loadMaterials();
    } catch (err) {
      setError("Erreur lors de la création");
    }
  }

  async function handleUpdate() {
    if (!editId) return;
    try {
      await updateMaterial(editId, name, Number(categoryId), available);
      setEditId(null);
      setName("");
      setCategoryId("");
      setAvailable(true);
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

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Nom", accessor: "name" },
    { header: "Catégorie", accessor: "categoryId" },
    { 
      header: "Disponible", 
      accessor: "available",
      render: (row) => (row.available ? "Oui" : "Non")
    }
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h2>Gestion du matériel</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <Table
        columns={columns}
        data={materials}
        renderActions={(row) => (
          <>
            {role === "admin" ? (
              <>
                <button
                  onClick={() => {
                    setEditId(row.id);
                    setName(row.name);
                    setCategoryId(row.categoryId);
                    setAvailable(row.available);
                  }}
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Supprimer
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate(`/reservations?material=${row.id}`)}
              >
                Réserver
              </button>
            )}
          </>
        )}
      />

      {role === "admin" && (
        <>
          <h3>{editId ? "Modifier un matériel" : "Ajouter un matériel"}</h3>

          <form
            onSubmit={editId ? handleUpdate : handleCreate}
            style={{ display: "flex", gap: "10px" }}
          >
            <input
              type="text"
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="number"
              placeholder="ID catégorie"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            />

            <select
              value={available ? "true" : "false"}
              onChange={(e) => setAvailable(e.target.value === "true")}
            >
              <option value="true">Disponible</option>
              <option value="false">Indisponible</option>
            </select>

            <button type="submit">
              {editId ? "Mettre à jour" : "Ajouter"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
