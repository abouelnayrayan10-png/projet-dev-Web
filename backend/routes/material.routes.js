const express = require("express");
const router = express.Router();
const materialController = require("../controllers/material.controller");

// GET /api/materials
router.get("/", materialController.list);

module.exports = router;
