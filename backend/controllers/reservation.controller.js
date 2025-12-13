const { reservations, materials } = require("../data/data");

// ===============================
// GET /api/reservations
// ===============================
exports.list = (req, res) => {
  if (req.user.role === "admin") {
    return res.json(reservations);
  }

  const userReservations = reservations.filter(
    (r) => r.userId === req.user.id
  );

  res.json(userReservations);
};

// ===============================
// POST /api/reservations
// ===============================
exports.create = (req, res) => {
  const { materialId, startDate, endDate } = req.body;

  if (!materialId || !startDate || !endDate) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  const material = materials.find((m) => m.id === Number(materialId));

  if (!material) {
    return res.status(404).json({ message: "Matériel introuvable" });
  }

  // 🔥 LOGIQUE QUANTITÉ
  if (material.quantity <= 0) {
    return res.status(400).json({ message: "Matériel indisponible" });
  }

  // Création réservation
  const reservation = {
    id: reservations.length
      ? reservations[reservations.length - 1].id + 1
      : 1,
    userId: req.user.id,
    materialId: material.id,
    startDate,
    endDate,
  };

  reservations.push(reservation);

  // 🔥 DÉCRÉMENTATION
  material.quantity -= 1;

  if (material.quantity === 0) {
    material.available = false;
  }

  res.status(201).json(reservation);
};

// ===============================
// DELETE /api/reservations/:id
// ===============================
exports.remove = (req, res) => {
  const id = Number(req.params.id);
  const index = reservations.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Réservation introuvable" });
  }

  const reservation = reservations[index];

  // 🔒 Sécurité
  if (req.user.role !== "admin" && reservation.userId !== req.user.id) {
    return res.status(403).json({ message: "Accès interdit" });
  }

  const material = materials.find(
    (m) => m.id === reservation.materialId
  );

  // 🔥 RESTAURATION DE QUANTITÉ
  if (material) {
    material.quantity += 1;
    material.available = true;
  }

  reservations.splice(index, 1);

  res.json({ message: "Réservation supprimée" });
};
