const { Schema, model } = require("mongoose");

const ProductDataModel = new Schema(
  {
    id: String,
    category: String,
    description:String,
    image_Url:  String, 
    price: Number,
    discount_price:Number,
    rating: Number,
    total_sell: Number,
    stock: Number,
    name: String,
  },
  {
    collection: "ProductData"
  }
);

module.exports = model("ProductData", ProductDataModel);