import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, "Nama Lengkap wajib diisi"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
