// FAUSSE BASE DE DONNÉES EN MÉMOIRE
 
let reservations = [
  // exemple :
  // { id: 1, userId: 1, materialId: 2, startDate: "2025-01-01", endDate: "2025-01-02" }
];
 
let materials = [
  { id: 1, name: "Caméra HD", categoryId: 2, available: false },
  { id: 2, name: "Micro", categoryId: 1, available: true },
  { id: 3, name: "PC portable", categoryId: 3, available: false },
];
 
// GET /api/reservations
exports.list = (req, res) => {
  // Admin → voit tout
  if (req.user.role === "admin") {
    return res.status(200).json(reservations);
  }
 
  // User → voit seulement SES réservations
  const userReservations = reservations.filter(
    (r) => r.userId === req.user.id
  );
 
  res.status(200).json(userReservations);
};
 
// POST /api/reservations
exports.create = (req, res) => {
  const { materialId, startDate, endDate } = req.body;
 
  if (!materialId || !startDate || !endDate) {
    return res.status(400).json({
      message: "materialId, startDate et endDate sont obligatoires",
    });
  }
 
  const material = materials.find(
    (m) => m.id === Number(materialId)
  );
 
  if (!material) {
    return res.status(404).json({ message: "Matériel introuvable" });
  }
 
  if (!material.available) {
    return res
      .status(400)
      .json({ message: "Matériel non disponible" });
  }
 
  const newReservation = {
    id:
      reservations.length > 0
        ? reservations[reservations.length - 1].id + 1
        : 1,
    userId: req.user.id,
    materialId: Number(materialId),
    startDate,
    endDate,
  };
 
  reservations.push(newReservation);
 
  // Le matériel devient indisponible
  material.available = false;
 
  res.status(201).json(newReservation);
};