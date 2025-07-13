import express from "express";
import joinController from "../controllers/join.controller.js";

const router = express.Router();

router.post("/join", joinController.joinBossFight);

export default router;
