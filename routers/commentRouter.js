import Router from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

const commentRouter = Router();

commentRouter
  .post("/add-comment/:id", authMiddleware, addComment)
  .get("/get-comments", authMiddleware, getComments)

  .put("/update-comment/:id", authMiddleware, updateComment)
  .delete("/delete-comment/:id", authMiddleware, deleteComment);

export default commentRouter;
