import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";

// konfigurasi dotenv
dotenv.config();

const app = express();
const port = 3000;

// middleware
app.use(express.json()); // menampung data json di request body
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // menampung data urlencoded di request body

// Parent router
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);

app.use(notFound);
app.use(errorHandler);

// Server
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

// koneksi DB
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("Database berhasil terkoneksi"))
  .catch((err) => console.log(err));
