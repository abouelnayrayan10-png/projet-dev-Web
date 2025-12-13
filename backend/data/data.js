// ==============================
// FAUSSE BASE DE DONNÉES EN MÉMOIRE
// ==============================

// --- UTILISATEURS ---
exports.users = [
  {
    id: 1,
    email: "user@test.com",
    password: "1234",
    role: "user"
  },
  {
    id: 2,
    email: "admin@test.com",
    password: "admin123",
    role: "admin"
  }
];

// --- MATERIELS ---
exports.materials = [
  { id: 1, name: "Caméra HD", quantity: 2, available: true },
  { id: 2, name: "Micro", quantity: 1, available: true },
  { id: 3, name: "PC portable", quantity: 3, available: true }
];

// --- RÉSERVATIONS ---
exports.reservations = [
  // vide au départ
];
