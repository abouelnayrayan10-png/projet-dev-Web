const { reservations, materials } = require("../data/data");

// Chevauchement de dates
function isOverlapping(r, start, end) {
  return r.startDate <= end && r.endDate >= start;
}

exports.list = (req, res) => {
  if (req.user.role === "admin") {
    return res.json(reservations);
  }

  const myReservations = reservations.filter((r) => r.userId === req.user.id);
  res.json(myReservations);
};

exports.create = (req, res) => {
  const { materialId, startDate, endDate } = req.body;

  if (!materialId || !startDate || !endDate) {
    return res.status(400).json({
      message: "materialId, startDate et endDate obligatoires",
    });
  }

  const material = materials.find((m) => m.id === Number(materialId));
  if (!material) {
    return res.status(404).json({ message: "Matériel introuvable" });
  }

  // Vérifier chevauchement
  const overlap = reservations.some(
    (r) =>
      r.materialId === Number(materialId) &&
      isOverlapping(r, startDate, endDate)
  );

  if (overlap) {
    return res.status(400).json({
      message: "Ce matériel est déjà réservé sur cette période",
    });
  }

  const newReservation = {
    id: reservations.length ? reservations[reservations.length - 1].id + 1 : 1,
    userId: req.user.id,
    materialId: Number(materialId),
    startDate,
    endDate,
  };

  reservations.push(newReservation);

  // matériel devient indispo
  material.available = false;

  res.status(201).json(newReservation);
};

exports.remove = (req, res) => {
  const id = Number(req.params.id);

  const idx = reservations.findIndex((r) => r.id === id);
  if (idx === -1)
    return res.status(404).json({ message: "Réservation introuvable" });

  const deleted = reservations[idx];
  reservations.splice(idx, 1);

  res.json({ message: "Réservation supprimée", deleted });
};
