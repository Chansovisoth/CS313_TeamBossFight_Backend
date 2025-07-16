import express from "express";
import userController from "../controllers/user.controller.js";
import { authenticateToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

// Protect all user management routes - Admin only
router.use(authenticateToken, authorizeRoles('admin'));

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
