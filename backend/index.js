const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const materialRoutes = require("./routes/material.routes");
const reservationRoutes = require("./routes/reservation.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Route de test backend
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend location matériel" });
});

// Routes de l'API
app.use("/api/auth", authRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/reservations", reservationRoutes);

// Lancement du serveur
app.listen(PORT, () => {
  console.log("Backend lancé sur le port " + PORT);
});
