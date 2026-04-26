import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import cors from "cors";
import fs from "fs";
import path from "path";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRouter.js";

// konfigurasi dotenv
dotenv.config();

const app = express();
const port = 3000;

// Load semua file
const userDoc = YAML.load("./doc/user.yaml");
const productDoc = YAML.load("./doc/product.yaml");

// Swagger
const swaggerDocument = {
  ...userDoc,
  paths: {
    ...userDoc.paths,
    ...productDoc.paths,
  },
  components: {
    ...userDoc.components,
    schemas: {
      ...userDoc.components.schemas,
      ...productDoc.components.schemas,
    },
  },
};
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// middleware
app.use(express.json()); // menampung data json di request body
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // menampung data urlencoded di request body
app.use(express.static("./public")); // folder public dapat diaskes di browser
app.use(cors()); // Ini mengizinkan semua origin untuk mengakses API Anda

// Parent router
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);

app.use(notFound);
app.use(errorHandler);

// Server
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

// koneksi DB
mongoose
  .connect(process.env.DATABASE, {
    bufferCommands: false,
  })
  .then(() => console.log("Database berhasil terkoneksi"))
  .catch((err) => console.log(err));
