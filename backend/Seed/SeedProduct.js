const mongoose = require("mongoose");
const ProductDataModel = require("../Models/productDataModel");
const productData =require("./Products.json")

const mongoURI = "mongodb+srv://20211a05c2:Shiva2k3@eco.4gf33f5.mongodb.net/?retryWrites=true&w=majority";

async function updateImageUrl() {
  try {
    await mongoose.connect(mongoURI);

    for (const product of productData) {
      const { id, image_Url } = product;
      await ProductDataModel.findOneAndUpdate(
        { id: id },
        { $set: { image_Url: image_Url[0].url } },
        { new: true }
      );
      console.log(`Updated image_Url for product with ID ${id}`);
    }
    console.log('All image_Url updated successfully!');
  } catch (error) {
    console.error('Error updating image_Url:', error);
  } finally {
    mongoose.disconnect();
  }
}

updateImageUrl();