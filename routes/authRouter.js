import express from "express";

const router = express.Router();

// post /api/v1/auth/register
router.post("/register", (req, res) => {
  res.send("Register");
});

// post /api/v1/auth/login
router.post("/login", (req, res) => {
  res.send("Login");
});

// get /api/v1/auth/logout
router.get("/logout", (req, res) => {
  res.send("Logout");
});

// get /api/v1/auth/getUser
router.get("/getUser", (req, res) => {
  res.send("Get Current User");
});

export default router;
