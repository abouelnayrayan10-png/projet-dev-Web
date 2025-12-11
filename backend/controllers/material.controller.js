const { materials } = require("../data/data");

// GET : liste
exports.list = (req, res) => {
  res.status(200).json(materials);
};

// POST : création
exports.create = (req, res) => {
  const { name, categoryId, available } = req.body;

  if (!name || !categoryId) {
    return res.status(400).json({
      message: "name et categoryId sont obligatoires",
    });
  }

  const newMaterial = {
    id: materials.length ? materials[materials.length - 1].id + 1 : 1,
    name,
    categoryId,
    available: available !== undefined ? available : true,
  };

  materials.push(newMaterial);
  res.status(201).json(newMaterial);
};

// PUT : mise à jour
exports.update = (req, res) => {
  const id = Number(req.params.id);
  const { name, categoryId, available } = req.body;

  const material = materials.find((m) => m.id === id);
  if (!material)
    return res.status(404).json({ message: "Matériel introuvable" });

  if (name !== undefined) material.name = name;
  if (categoryId !== undefined) material.categoryId = categoryId;
  if (available !== undefined) material.available = available;

  res.json(material);
};

// DELETE : suppression
exports.remove = (req, res) => {
  const id = Number(req.params.id);

  const idx = materials.findIndex((m) => m.id === id);
  if (idx === -1)
    return res.status(404).json({ message: "Matériel introuvable" });

  const deleted = materials[idx];
  materials.splice(idx, 1);

  res.json({ message: "Matériel supprimé", deleted });
};
