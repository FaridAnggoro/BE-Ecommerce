import express from "express";

import authRouter from "./routes/authRouter.js";

const app = express();
const port = 3000;

// Parent router
app.use("/api/v1/auth", authRouter);

// Server
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
