import asyncHandler from "../middleware/asyncHandler.js";

export const CreateOrder = asyncHandler(async (req, res) => {
  return res.status(201).json({
    message: "Berhasil tambah pesanan",
  });
});

export const AllOrder = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "Menampilkan semua pesanan",
  });
});

export const DetailOrder = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "Detail pesanan",
  });
});

export const CurrentUserOrder = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "Menampilkan pesanan Anda",
  });
});

export const TesProduct = asyncHandler(async (req, res) => {
  res.send("Upload Product");
});
