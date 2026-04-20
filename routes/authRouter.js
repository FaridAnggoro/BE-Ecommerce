import express from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/authController.js";
import { protectedMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

// post /api/v1/auth/register
router.post("/register", registerUser);

// post /api/v1/auth/login
router.post("/login", loginUser);

// get /api/v1/auth/logout
router.get("/logout", protectedMiddleware, logoutUser);

// get /api/v1/auth/getUser
router.get("/getUser", protectedMiddleware, getCurrentUser);

export default router;
