// URL du backend

export const API_URL = "http://localhost:3000/api";
 
// Fonction pour envoyer automatiquement le token stocké dans localStorage

export function getAuthHeaders() {

  const token = localStorage.getItem("token"); // <-- récupère ton token
 
  if (!token) {

    return {};

  }
 
  return {

    Authorization: `Bearer ${token}`, // <-- envoie le token dans les headers

  };

}
 
// ---------- Fonctions pour le matériel ----------
 
export async function fetchMaterials() {

  const response = await fetch(`${API_URL}/materials`, {

    method: "GET",

    headers: {

      "Content-Type": "application/json",

      ...getAuthHeaders(),

    },

  });
 
  if (!response.ok) {

    throw new Error("Erreur lors de la récupération du matériel");

  }
 
  return response.json();

}
 
export async function createMaterial(name, categoryId, available) {

  const response = await fetch(`${API_URL}/materials`, {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

      ...getAuthHeaders(),

    },

    body: JSON.stringify({ name, categoryId, available }),

  });
 
  if (!response.ok) {

    throw new Error("Erreur lors de la création du matériel");

  }
 
  return response.json();

}
 
export async function updateMaterial(id, name, categoryId, available) {

  const response = await fetch(`${API_URL}/materials/${id}`, {

    method: "PUT",

    headers: {

      "Content-Type": "application/json",

      ...getAuthHeaders(),

    },

    body: JSON.stringify({ name, categoryId, available }),

  });
 
  if (!response.ok) {

    throw new Error("Erreur lors de la mise à jour du matériel");

  }
 
  return response.json();

}
 
export async function deleteMaterial(id) {

  const response = await fetch(`${API_URL}/materials/${id}`, {

    method: "DELETE",

    headers: {

      "Content-Type": "application/json",

      ...getAuthHeaders(),

    },

  });
 
  if (!response.ok) {

    throw new Error("Erreur lors de la suppression du matériel");

  }
 
  return response.json();

}

 