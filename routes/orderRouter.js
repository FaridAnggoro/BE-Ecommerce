import express from "express";
import {
  ownerMiddleware,
  protectedMiddleware,
} from "../middleware/authMiddleware.js";
import {
  AllOrder,
  CreateOrder,
  CurrentUserOrder,
  DetailOrder,
} from "../controller/OrderController.js";

const router = express.Router();

// create order
// post /api/v1/order
// middleware user auth
router.post("/", protectedMiddleware, CreateOrder);

// all order
// post /api/v1/order
// middleware owner
router.get("/", protectedMiddleware, ownerMiddleware, AllOrder);

// all order
// post /api/v1/order/:id
// middleware owner
router.get("/:id", protectedMiddleware, ownerMiddleware, DetailOrder);

// all order
// post /api/v1/order/current/user
// middleware user auth
router.get("/current/user", protectedMiddleware, CurrentUserOrder);

export default router;
