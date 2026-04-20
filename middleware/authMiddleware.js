import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../model/userModel.js";

export const protectedMiddleware = asyncHandler(async (req, res, next) => {
  // variabel kosong
  let token;

  // ambil token
  token = req.cookies.jwt;

  if (token) {
    try {
      // ambil id user berdasarkan token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // masukan user id ke request user
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      // token error
      res.status(401);
      throw new Error("token belum ada");
    }
  } else {
    // token tidak didapatkan
    res.status(401);
    throw new Error("token tidak ditemukan");
  }
});
