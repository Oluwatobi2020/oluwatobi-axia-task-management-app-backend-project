import Router from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";

const categoryRouter = Router();

categoryRouter
  .get("/get-categories", authMiddleware, getCategories)
  .post("/create-category", authMiddleware, adminOnly, createCategory)

  .get("/get-category/:id", authMiddleware, getCategoryById)
  .put("/update-category/:id", authMiddleware, adminOnly, updateCategory)
  .delete("/delete-category/:id", authMiddleware, adminOnly, deleteCategory);

export default categoryRouter;
