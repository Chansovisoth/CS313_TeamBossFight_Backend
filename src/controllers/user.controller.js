import { User } from "../models/index.js";
import { Op } from "sequelize";

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = search ? {
      [Op.or]: [
        { username: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ]
    } : {};

    const users = await User.findAndCountAll({
      where: whereClause,
      attributes: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset
    });

    res.status(200).json({
      users: users.rows,
      totalCount: users.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(users.count / limit),
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id, {
      attributes: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt']
    });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;
    const adminId = req.user.id;

    // Validate input
    if (!username || !email || !role) {
      return res.status(400).json({ message: "Username, email, and role are required" });
    }

    // Validate role
    const validRoles = ['player', 'host', 'admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role. Must be player, host, or admin" });
    }

    // Find the user to update
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent admin from demoting themselves
    if (user.id === adminId && user.role === 'admin' && role !== 'admin') {
      return res.status(403).json({ message: "You cannot demote yourself from admin role" });
    }

    // Check for duplicate username/email (excluding current user)
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { username: username.trim() },
          { email: email.trim() }
        ],
        id: { [Op.ne]: id }
      }
    });

    if (existingUser) {
      if (existingUser.username === username.trim()) {
        return res.status(409).json({ message: "Username already exists" });
      }
      if (existingUser.email === email.trim()) {
        return res.status(409).json({ message: "Email already exists" });
      }
    }

    // Update user
    await user.update({
      username: username.trim(),
      email: email.trim(),
      role
    });

    // Return updated user without password
    const updatedUser = await User.findByPk(id, {
      attributes: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt']
    });

    res.status(200).json({ 
      message: "User updated successfully", 
      user: updatedUser 
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.id;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent admin from deleting themselves
    if (user.id === adminId) {
      return res.status(403).json({ message: "You cannot delete your own account" });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

export default {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
