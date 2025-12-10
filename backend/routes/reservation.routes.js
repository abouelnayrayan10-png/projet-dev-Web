const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservation.controller");

// GET /api/reservations
router.get("/", reservationController.list);

module.exports = router;
