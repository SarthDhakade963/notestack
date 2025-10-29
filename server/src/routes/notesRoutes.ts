import express from "express";

import { authenticate } from "../middleware/authMiddleware";
import {
  createNote,
  deleteNote,
  getDashboardStats,
  getNotes,
  updateNote,
} from "../controller/notesController";

const router = express.Router();

router.use(authenticate);
router.post("/", createNote);
router.get("/", getNotes);
router.patch("/:noteId", updateNote);
router.delete("/:noteId", deleteNote);
router.get("/dashboard", getDashboardStats);

export default router;
