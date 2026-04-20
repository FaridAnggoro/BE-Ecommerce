import asyncHandler from "../middleware/asyncHandler.js";

export const CreateProduct = asyncHandler(async (req, res) => {
  res.send("Create Product");
});

export const AllProduct = asyncHandler(async (req, res) => {
  res.send("All Product");
});

export const DetailProduct = asyncHandler(async (req, res) => {
  res.send("Detail Product");
});

export const UpdateProduct = asyncHandler(async (req, res) => {
  res.send("Update Product");
});

export const DeleteProduct = asyncHandler(async (req, res) => {
  res.send("Delete Product");
});

export const UploadProduct = asyncHandler(async (req, res) => {
  res.send("Upload Product");
});
