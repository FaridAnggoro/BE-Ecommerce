import express from "express";

import { protectedMiddleware } from "../middleware/authMiddleware.js";

import {
  AllProduct,
  CreateProduct,
  DeleteProduct,
  DetailProduct,
  UpdateProduct,
  UploadProduct,
} from "../controller/ProductController.js";

const router = express.Router();

// create data product
// post /api/v1/auth/product
// middleware owner
router.post("/", protectedMiddleware, CreateProduct);

// all data product
// get /api/v1/auth/product
router.get("/", AllProduct);

// detail data product
// get /api/v1/auth/product/:id
router.get("/:id", DetailProduct);

// update data product
// put /api/v1/auth/product/:id
// middleware owner
router.put("/:id", protectedMiddleware, UpdateProduct);

// delete data product
// put /api/v1/auth/product
// middleware owner
router.delete("/:id", protectedMiddleware, DeleteProduct);

// delete data product
// post /api/v1/auth/product/file-upload
// middleware owner
router.post("/file-upload", protectedMiddleware, UploadProduct);

export default router;
