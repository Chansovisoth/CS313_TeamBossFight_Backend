import { Question, Category } from "../models/index.js";

/**
 * Middleware to check if the user owns the question resource or is an admin
 */
export function checkQuestionOwnership(req, res, next) {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const userRole = req.user.role;

      // Admins can access all questions
      if (userRole === 'admin') {
        return next();
      }

      // Find the question and check ownership
      const question = await Question.findByPk(id);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      // Check if user owns the question
      if (question.authorId !== userId) {
        return res.status(403).json({ 
          message: "Forbidden: You can only manage your own questions" 
        });
      }

      next();
    } catch (error) {
      console.error("Error checking question ownership:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

/**
 * Middleware to check if the user owns the category resource or is an admin
 */
export function checkCategoryOwnership(req, res, next) {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const userRole = req.user.role;

      // Admins can access all categories
      if (userRole === 'admin') {
        return next();
      }

      // Find the category and check ownership
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      // Check if user owns the category
      if (category.creatorId !== userId) {
        return res.status(403).json({ 
          message: "Forbidden: You can only manage your own categories" 
        });
      }

      next();
    } catch (error) {
      console.error("Error checking category ownership:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

/**
 * Middleware to filter questions based on user role
 * Hosts and admins can see all questions, but hosts can only edit their own
 */
export function getQuestionFilter(req, res, next) {
  // Both hosts and admins can see all questions
  req.questionFilter = {};
  next();
}

/**
 * Middleware to filter categories based on user role
 * Hosts and admins can see all categories, but hosts can only edit their own
 */
export function getCategoryFilter(req, res, next) {
  // Both hosts and admins can see all categories
  req.categoryFilter = {};
  next();
}
