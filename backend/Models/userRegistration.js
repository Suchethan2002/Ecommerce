const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    age: Number,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
    },
    // You can add more fields as per your requirements
  },
  {
    collection: "UserInfo",
  }
);

module.exports = model("UserInfo", UserSchema);
