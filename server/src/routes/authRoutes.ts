import express from "express";

import { authenticate } from "../middleware/authMiddleware";
import { login, me, register } from "../controller/authController";

const router = express.Router();
router.post("/signup", register);
router.post("/login", login);
router.get("/me", authenticate, me);

export default router;
