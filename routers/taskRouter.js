import Router from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
  updateTaskStatus,
} from "../controllers/taskController.js";

const taskRouter = Router();

taskRouter
  .get("/get-tasks", authMiddleware, getTasks)
  .post("/create-task", authMiddleware, createTask)

  .get("/get-task/:id", authMiddleware, getTaskById)
  .put("/update-task/:id", authMiddleware, updateTask)
  .delete("/delete-task/:id", authMiddleware, deleteTask)
  .patch("/update-task-status/:id", authMiddleware, updateTaskStatus);

export default taskRouter;
