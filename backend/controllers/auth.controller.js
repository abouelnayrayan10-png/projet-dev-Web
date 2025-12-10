const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// Fake base de données users
const users = [
  { id: 1, email: "user@test.com", password: "user123", role: "user" },
  { id: 2, email: "admin@test.com", password: "admin123", role: "admin" }
];

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Vérification utilisateur
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Identifiants incorrects" });
  }

  // Création du token
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    role: user.role
  });
};
