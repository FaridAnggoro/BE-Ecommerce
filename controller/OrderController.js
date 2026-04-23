import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../model/orderModel.js";
import Product from "../model/productModel.js";

export const CreateOrder = asyncHandler(async (req, res) => {
  // request body
  const { first_name, last_name, email, phone, cartItem } = req.body;

  // keranjang kosong
  if (!cartItem || cartItem.length < 0) {
    res.status(400);
    throw new Error("Keranjang kosong");
  }

  // item order
  let orderItem = [];
  // total order
  let total = 0;

  // ambil cartItem
  for (const cart of cartItem) {
    // cek data yang dimasukan dalam id ada di database/tidak
    const productData = await Product.findOne({
      _id: cart.product,
    });

    // kondisi jika data tidak ada
    if (!productData) {
      res.status(404);
      throw new Error("id produk tidak ditemukan");
    }

    // ambil data produk
    const { product_name, price, _id } = productData;
    // ambil singleProduk
    const singleProduct = {
      quantity: cart.quantity,
      product_name: productData.product_name,
      price,
      product: _id,
    };

    // tampung product data ke order item
    orderItem = [...orderItem, singleProduct];

    // total produk
    total += cart.quantity * price;
  }

  // masukan data order ke db
  const order = await Order.create({
    itemsDetail: orderItem,
    total,
    first_name,
    last_name,
    email,
    phone,
    user: req.user.id,
  });

  return res.status(201).json({
    total,
    order,
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
