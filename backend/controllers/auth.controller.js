const { users } = require("../data/data");

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(400).json({ message: "Identifiants incorrects" });
  }

  // TOKEN SIMPLE EN MÉMOIRE
  const token = Buffer.from(`${user.id}:${user.role}`).toString("base64");

  res.json({
    token,
    role: user.role,
  });
};

// MIDDLEWARE POUR LIRE LE TOKEN
exports.authenticateToken = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ message: "Token manquant" });

  const token = header.split(" ")[1];

  try {
    const decoded = Buffer.from(token, "base64").toString().split(":");

    req.user = {
      id: Number(decoded[0]),
      role: decoded[1],
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
};
