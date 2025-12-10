// FAUSSE BASE DE DONNÉES EN MÉMOIRE
 
// catégories de matériel
let categories = [
  { id: 1, name: "Audio" },
  { id: 2, name: "Vidéo" },
  { id: 3, name: "Informatique" },
];
 
// matériel
let materials = [
  { id: 1, name: "Caméra HD", categoryId: 2, available: true },
  { id: 2, name: "Micro", categoryId: 1, available: true },
  { id: 3, name: "PC portable", categoryId: 3, available: false },
];
 
// GET /api/materials
exports.list = (req, res) => {
  res.status(200).json(materials);
};
 
// POST /api/materials
exports.create = (req, res) => {
  const { name, categoryId, available } = req.body;
 
  if (!name || !categoryId) {
    return res
      .status(400)
      .json({ message: "name et categoryId sont obligatoires" });
  }
 
  const newMaterial = {
    id: materials.length > 0 ? materials[materials.length - 1].id + 1 : 1,
    name,
    categoryId,
    available: available !== undefined ? available : true,
  };
 
  materials.push(newMaterial);
  res.status(201).json(newMaterial);
};
 
// PUT /api/materials/:id
exports.update = (req, res) => {
  const id = Number(req.params.id);
  const { name, categoryId, available } = req.body;
 
  const material = materials.find((m) => m.id === id);
 
  if (!material) {
    return res.status(404).json({ message: "Matériel introuvable" });
  }
 
  if (name !== undefined) material.name = name;
  if (categoryId !== undefined) material.categoryId = categoryId;
  if (available !== undefined) material.available = available;
 
  res.status(200).json(material);
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
 
  res.status(200).json({
    message: "Matériel supprimé",
    deleted,
  });
};