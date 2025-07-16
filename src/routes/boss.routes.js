import express from "express";
import bossController from "../controllers/boss.controller.js";
import { authenticateToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

// Protect all boss management routes
router.use(authenticateToken, authorizeRoles('host', 'admin'));

router.get("/", bossController.getAllBosses);
router.get("/:id", bossController.getBossById);
router.post("/", bossController.createBoss);
router.put("/:id", bossController.updateBoss);
router.delete("/:id", bossController.deleteBoss);

export default router;
