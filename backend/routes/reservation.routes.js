const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservation.controller");
const {
  authenticateToken,
} = require("../middlewares/auth.middleware");
 
// GET /api/reservations
router.get("/", authenticateToken, reservationController.list);
 
// POST /api/reservations
router.post("/", authenticateToken, reservationController.create);
 
module.exports = router;