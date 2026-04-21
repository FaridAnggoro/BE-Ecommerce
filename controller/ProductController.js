import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../model/productModel.js";

export const CreateProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body);

  return res.status(201).json({
    message: "Berhasil tambah product",
    data: newProduct,
  });
});

export const AllProduct = asyncHandler(async (req, res) => {
  const data = await Product.find();

  return res.status(200).json({
    message: "Menampilkan semua data product",
    data,
  });
});

export const DetailProduct = asyncHandler(async (req, res) => {
  // ambil parameter id produk
  const paramsId = req.params.id;
  // kondisi mengambil nilai berdasarkan id
  const productData = await Product.findById(paramsId);

  // kondisi
  if (!productData) {
    res.status(404);
    throw new Error("Produk tidak ditemukan");
  }

  return res.status(200).json({
    message: "Menampilkan detail produk",
    data: productData,
  });
});

export const UpdateProduct = asyncHandler(async (req, res) => {
  // ambil parameter id
  const paramId = req.params.id;
  const updateProduct = await Product.findByIdAndUpdate(paramId, req.body, {
    runValidators: false,
    new: true,
  });

  return res.status(201).json({
    message: "Data produk telah diubah",
    data: updateProduct,
  });
});

export const DeleteProduct = asyncHandler(async (req, res) => {
  // ambil parameter id
  const paramId = req.params.id;

  await Product.findByIdAndDelete(paramId);

  return res.status(200).json({
    message: "Menghapus data produk",
  });
});

export const UploadProduct = asyncHandler(async (req, res) => {
  res.send("Upload Product");
});

export const TesProduct = asyncHandler(async (req, res) => {
  res.send("Upload Product");
});
