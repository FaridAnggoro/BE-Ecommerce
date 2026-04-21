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
  // ambil request file
  const file = req.file;
  // validasi upload
  if (!file) {
    res.status(400);
    throw new Error("Input file gambar masih kosong");
  }

  // ambil nama file
  const imageFileName = file.filename;
  // lokasi file
  const pathImageFile = `/uploads/${imageFileName}`;

  // respon
  res.status(200).json({
    message: "Gambar produk telah diupload",
    image: pathImageFile,
  });
});

export const TesProduct = asyncHandler(async (req, res) => {
  res.send("Upload Product");
});
