const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const materialRoutes = require("./routes/material.routes");
const reservationRoutes = require("./routes/reservation.routes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/reservations", reservationRoutes);

app.listen(PORT, () => {
  console.log("Backend lancé sur le port", PORT);
});
