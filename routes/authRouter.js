import express from "express";
import { loginUser, registerUser } from "../controller/authController.js";

const router = express.Router();

// post /api/v1/auth/register
router.post("/register", registerUser);

// post /api/v1/auth/login
router.post("/login", loginUser);

// get /api/v1/auth/logout
router.get("/logout", (req, res) => {
  res.send("Logout");
});

// get /api/v1/auth/getUser
router.get("/getUser", (req, res) => {
  res.send("Get Current User");
});

export default router;
