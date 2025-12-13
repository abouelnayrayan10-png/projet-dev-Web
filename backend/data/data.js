// ==============================
// FAUSSE BASE DE DONNÉES EN MÉMOIRE
// ==============================

// --- UTILISATEURS ---
exports.users = [
  {
    id: 1,
    email: "user@test.com",
    password: "1234",
    role: "user",
  },
  {
    id: 2,
    email: "admin@test.com",
    password: "admin123",
    role: "admin",
  },
];

// --- MATERIELS ---
// la disponibilité est calculée via quantity - réservations
exports.materials = [
  { id: 1, name: "Caméra HD", quantity: 2 },
  { id: 2, name: "Micro", quantity: 1 },
  { id: 3, name: "PC portable", quantity: 3 },
];

// --- RÉSERVATIONS ---
exports.reservations = [
  // Exemple :
  // {
  //   id: 1,
  //   userId: 1,
  //   materialId: 1,
  //   startDate: "2026-01-20",
  //   endDate: "2026-01-25",
  // }
];
