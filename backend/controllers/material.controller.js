const { materials, reservations } = require("../data/data");

// GET /api/materials
exports.list = (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  const enrichedMaterials = materials.map((material) => {
    const activeReservations = reservations.filter(
      (r) =>
        r.materialId === material.id &&
        r.startDate <= today &&
        r.endDate >= today
    );

    const remaining = material.quantity - activeReservations.length;

    return {
      ...material,
      remaining,
      available: remaining > 0,
    };
  });

  res.status(200).json(enrichedMaterials);
};

// POST /api/materials
exports.create = (req, res) => {
  const { name, quantity } = req.body;

  if (!name || quantity === undefined) {
    return res.status(400).json({
      message: "name et quantity sont obligatoires",
    });
  }

  const newMaterial = {
    id: materials.length
      ? materials[materials.length - 1].id + 1
      : 1,
    name,
    quantity: Number(quantity),
  };

  materials.push(newMaterial);
  res.status(201).json(newMaterial);
};

// PUT /api/materials/:id
exports.update = (req, res) => {
  const id = Number(req.params.id);
  const { name, quantity } = req.body;

  const material = materials.find((m) => m.id === id);
  if (!material) {
    return res.status(404).json({ message: "Matériel introuvable" });
  }

  if (name !== undefined) material.name = name;
  if (quantity !== undefined) material.quantity = Number(quantity);

  res.json(material);
};

// DELETE /api/materials/:id
exports.remove = (req, res) => {
  const id = Number(req.params.id);
  const index = materials.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Matériel introuvable" });
  }

  const deleted = materials[index];
  materials.splice(index, 1);

  res.json({ message: "Matériel supprimé", deleted });
};
