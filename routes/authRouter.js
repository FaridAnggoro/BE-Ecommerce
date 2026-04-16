import express from "express";
import User from "../model/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

// post /api/v1/auth/register
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    await User.create({
      fullname: req.body.fullname,
    });
  }),
);

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
