const { Schema, model } = require("mongoose");

const UserDataSchema = new Schema(
  {
    email: String,
    visit_date: Date,
    category: String,
    product_name: String,
    product_id: String,
    session_duration: Number,
    is_purchase: Boolean,
    quantity: Number,
    price: Number,
    time_spent_on_product: Number,
    device_type: String,
    location: String,
    payment_method: String
  },
  {
    collection: "UserData"
  }
);

module.exports = model("UserData", UserDataSchema);
