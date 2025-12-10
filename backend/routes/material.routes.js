const express = require("express");

const router = express.Router();

const materialController = require("../controllers/material.controller");

const {

  authenticateToken,

  authorizeRole,

} = require("../middlewares/auth.middleware");
 
// Tous les utilisateurs connectés peuvent voir la liste du matériel

router.get(

  "/",

  authenticateToken,

  materialController.list

);
 
// Admin : créer un matériel

router.post(

  "/",

  authenticateToken,

  authorizeRole("admin"),

  materialController.create

);
 
// Admin : modifier un matériel

router.put(

  "/:id",

  authenticateToken,

  authorizeRole("admin"),

  materialController.update

);
 
// Admin : supprimer un matériel

router.delete(

  "/:id",

  authenticateToken,

  authorizeRole("admin"),

  materialController.remove

);
 
module.exports = router;

 