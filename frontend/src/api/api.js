// ================================
// URL du backend
// ================================
export const API_URL = "http://localhost:3000/api";


// ================================
// Auth : Connexion
// ================================
export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Identifiants incorrects");
  }

  return response.json(); // { token, role }
}


// ================================
// Gestion du token
// ================================
export function getAuthHeaders() {
  const token = localStorage.getItem("token");

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem("token"));
}

export function isAdmin() {
  return localStorage.getItem("role") === "admin";
}



// ================================
// Matériel
// ================================
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



// ================================
// Réservations — (MANQUAIT !)
// ================================
export async function fetchReservations() {
  const response = await fetch(`${API_URL}/reservations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des réservations");
  }

  return response.json();
}

export async function createReservation(materialId, date) {
  const response = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ materialId, date }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la création de la réservation");
  }

  return response.json();
}
