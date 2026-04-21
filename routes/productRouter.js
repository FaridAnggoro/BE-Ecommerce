import express from "express";

import {
  ownerMiddleware,
  protectedMiddleware,
} from "../middleware/authMiddleware.js";

import {
  AllProduct,
  CreateProduct,
  DeleteProduct,
  DetailProduct,
  UpdateProduct,
  UploadProduct,
} from "../controller/ProductController.js";
import { upload } from "../utils/uploadFileHandler.js";

const router = express.Router();

// create data product
// post /api/v1/auth/product
// middleware owner
router.post("/", protectedMiddleware, ownerMiddleware, CreateProduct);

// all data product
// get /api/v1/auth/product
router.get("/", AllProduct);

// detail data product
// get /api/v1/auth/product/:id
router.get("/:id", DetailProduct);

// update data product
// put /api/v1/auth/product/:id
// middleware owner
router.put("/:id", protectedMiddleware, ownerMiddleware, UpdateProduct);

// delete data product
// put /api/v1/auth/product
// middleware owner
router.delete("/:id", protectedMiddleware, ownerMiddleware, DeleteProduct);

// delete data product
// post /api/v1/auth/product/file-upload
// middleware owner
router.post(
  "/file-upload",
  protectedMiddleware,
  ownerMiddleware,
  upload.single("image"),
  UploadProduct,
);

export default router;
