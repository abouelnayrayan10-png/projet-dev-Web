const { materials } = require("../data/data");

// ===============================
// GET /api/materials
// ===============================
exports.list = (req, res) => {
  res.status(200).json(materials);
};

// ===============================
// POST /api/materials
// ===============================
exports.create = (req, res) => {
  const { name, quantity, available } = req.body;

  // 🔒 vérification des champs
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
    available: available !== undefined ? available : quantity > 0,
  };

  materials.push(newMaterial);
  res.status(201).json(newMaterial);
};

// ===============================
// PUT /api/materials/:id
// ===============================
exports.update = (req, res) => {
  const id = Number(req.params.id);
  const { name, quantity, available } = req.body;

  const material = materials.find((m) => m.id === id);

  if (!material) {
    return res.status(404).json({ message: "Matériel introuvable" });
  }

  if (name !== undefined) material.name = name;

  if (quantity !== undefined) {
    material.quantity = Number(quantity);
    material.available = material.quantity > 0;
  }

  if (available !== undefined) {
    material.available = available;
  }

  res.status(200).json(material);
};

// ===============================
// DELETE /api/materials/:id
// ===============================
exports.remove = (req, res) => {
  const id = Number(req.params.id);

  const index = materials.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Matériel introuvable" });
  }

  const deleted = materials[index];
  materials.splice(index, 1);

  res.status(200).json({
    message: "Matériel supprimé",
    deleted,
  });
};
