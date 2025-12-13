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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Identifiants incorrects");

  return response.json(); // { token, role }
}

// ================================
// Gestion du token
// ================================
export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
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
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Erreur récupération matériel");
  return response.json();
}

export async function createMaterial(name, quantity, available) {
  const response = await fetch(`${API_URL}/materials`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ name, quantity, available }),
  });

  if (!response.ok) throw new Error("Erreur création matériel");
  return response.json();
}

export async function updateMaterial(id, name, quantity, available) {
  const response = await fetch(`${API_URL}/materials/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ name, quantity, available }),
  });

  if (!response.ok) throw new Error("Erreur mise à jour matériel");
  return response.json();
}

export async function deleteMaterial(id) {
  const response = await fetch(`${API_URL}/materials/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Erreur suppression matériel");
  return response.json();
}

// ================================
// Réservations
// ================================
export async function fetchReservations() {
  const response = await fetch(`${API_URL}/reservations`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Erreur récupération réservations");
  return response.json();
}

export async function createReservation(materialId, startDate, endDate) {
  const response = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ materialId, startDate, endDate }),
  });

  if (!response.ok) {
    const err = await response.json();
    console.error("BACKEND ERROR :", err);
    throw new Error("Erreur lors de la création de la réservation");
  }

  return response.json();
}

export async function deleteReservation(id) {
  const response = await fetch(`${API_URL}/reservations/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Erreur suppression réservation");
  return response.json();
}
