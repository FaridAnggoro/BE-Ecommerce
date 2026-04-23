import mongoose from "mongoose";

const { Schema } = mongoose;

// schema objek mongoose
const singleProduct = Schema({
  product_name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product", // relasi
    required: true,
  },
});

const orderSchema = new Schema({
  total: {
    type: Number,
    required: [true, "Total harga wajib diisi"],
  },
  itemsDetail: [singleProduct],
  // user yg lakukan pembelian
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // relasi
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Failed", "Success"],
    default: "Pending",
  },
  first_name: {
    type: String,
    required: [true, "Nama Depan wajib diisi"],
  },
  last_name: {
    type: String,
    required: [true, "Nama Belakang wajib diisi"],
  },
  email: {
    type: String,
    required: [true, "Email wajib diisi"],
  },
  phone: {
    type: String,
    required: [true, "Nomor Telepon wajib diisi"],
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
