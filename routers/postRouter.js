import Router from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";

const postRouter = Router();

postRouter
  .get("/get-posts", authMiddleware, getPosts)
  .post("/create-post", authMiddleware, adminOnly, createPost)

  .get("/get-post/:id", authMiddleware, getPostById)
  .put("/update-post/:id", authMiddleware, adminOnly, updatePost)
  .delete("/delete-post/:id", authMiddleware, adminOnly, deletePost);

export default postRouter;
