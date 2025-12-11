const express = require("express");
const router = express.Router();
const controller = require("../controllers/material.controller");
const { authenticateToken } = require("../controllers/auth.controller");

router.get("/", authenticateToken, controller.list);
router.post("/", authenticateToken, controller.create);
router.put("/:id", authenticateToken, controller.update);
router.delete("/:id", authenticateToken, controller.remove);

module.exports = router;
