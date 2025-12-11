const API_URL = "http://localhost:3000/api";
 
// récupère le token stocké par le front (plus tard via la page Login)
function getAuthHeaders() {
  const token = localStorage.getItem("token");
 
  if (!token) {
    return {};
  }
 
  return {
    Authorization: `Bearer ${token}`,
  };
}
 
// ---------- Fonctions pour les réservations ----------
 
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
 
export async function createReservation(materialId, startDate, endDate) {
  const response = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ materialId, startDate, endDate }),
  });
 
  if (!response.ok) {
    throw new Error("Erreur lors de la création de la réservation");
  }
 
  return response.json();
}