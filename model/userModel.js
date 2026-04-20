import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, "Nama Lengkap wajib diisi"],
  },
  username: {
    type: String,
    required: [true, "Username wajib diisi"],
    unique: [true, "Username sudah terdaftar"],
  },
  email: {
    type: String,
    required: [true, "Email wajib diisi"],
    unique: [true, "Email sudah terdaftar"],
    validate: {
      validator: validator.isEmail,
      message: "Inputan harus berformat Email, contoh: jhonDue@mail.com",
    },
  },
  password: {
    type: String,
    required: [true, "Password wajib diisi"],
    minLength: [8, "Password minimal 8 karakter"],
  },
  role: {
    type: String,
    enum: ["owner", "user"],
    default: "user",
  },
});

// middleware mongoose => sebelum melakukan save data
userSchema.pre("save", async function () {
  // enkripsi
  const salt = await bcrypt.genSalt(10);
  // validasi
  this.password = await bcrypt.hash(this.password, salt);
});

// membandingkan password yg sudah terdaftar di db
userSchema.methods.comparePassword = async function (reqBody) {
  return await bcrypt.compare(reqBody, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
