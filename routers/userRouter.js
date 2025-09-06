import { Router } from "express";
import { getAllUser, createUser, updateAUser, deleteAUser, getUserDetails } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";

const userRouter = Router()
  .post("/create-user", createUser)
  .get("/get-all-user", getAllUser)
  .get("/get-user/:userId", getUserDetails)
  .put("/update-user/:userId", authMiddleware, updateAUser)
  .delete("/delete-user/:userId", authMiddleware, adminOnly, deleteAUser);

export default userRouter
