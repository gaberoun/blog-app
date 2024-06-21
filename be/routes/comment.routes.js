import { Router } from "express";
import {
  addComment,
  deleteCommentById,
} from "../controllers/comment.controllers.js";

const commentRoutes = Router();

commentRoutes.post("/", addComment);
commentRoutes.delete("/:commentId", deleteCommentById);

export default commentRoutes;
