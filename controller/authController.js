import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";

// fungsi token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "6d",
  });
};

// respon pembuatan token
const createResponToken = (user, statusCode, res) => {
  // jalankan token
  const token = signToken(user._id);

  // keamanan token
  const isDev = process.env.NODE_ENV === "development" ? false : true;

  //   cookies option
  const cookieOption = {
    expire: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    security: isDev,
  };

  //   respon cookie
  res.cookie("jwt", token, cookieOption);

  //   hidden password
  user.password = undefined;

  res.status(statusCode).json({
    data: user,
  });
};

// fungsi register
export const registerUser = asyncHandler(async (req, res) => {
  // kondisi role => user ada di database/tidak
  const isOwner = (await User.countDocuments()) === 0;

  // jika user = 0 => role = owner
  // jika user > 0 => role = user
  const role = isOwner ? "owner" : "user";

  const createUser = await User.create({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: role,
  });
  createResponToken(createUser, 201, res);
});

export const loginUser = asyncHandler(async (req, res) => {
  // validasi
  if (!req.body.email || !req.body.password) {
    res.status(400);
    throw new Error("Inputan email/password tidak boleh kosong!!!");
  }

  // cek email ada di db/tidak
  const userData = await User.findOne({
    email: req.body.email,
  });

  // cek password & panggil fungsi compare password
  if (userData && (await userData.comparePassword(req.body.password))) {
    // email & password benar
    createResponToken(userData, 200, res);
  } else {
    // email & password salah
    res.status(400);
    throw new Error("Invalid User");
  }
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    return res.status(200).json({
      user,
    });
  } else {
    res.status(400);
    throw new Error("User tidak ditemukan");
  }
});

export const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({
    message: "Akun berhasil keluar",
  });
};
