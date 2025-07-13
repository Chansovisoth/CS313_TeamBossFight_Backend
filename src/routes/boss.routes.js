import express from "express";
import bossController from "../controllers/boss.controller.js";

const router = express.Router();

router.get("/", bossController.getAllBosses);
router.get("/:id", bossController.getBossById);
router.post("/", bossController.createBoss);
router.put("/:id", bossController.updateBoss);
router.delete("/:id", bossController.deleteBoss);

export default router;
