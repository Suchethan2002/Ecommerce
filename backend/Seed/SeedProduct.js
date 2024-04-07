const mongoose = require("mongoose");
const ProductDataModel = require("../Models/productDataModel");
const productData = require("./Products.json");

const mongoURI = "mongodb+srv://20211a05c2:Shiva2k3@eco.4gf33f5.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        // Loop through products and check if each exists in the database
        productData.forEach(async (product) => {
            try {
                const { id } = product;

                // Check if product with same ID exists in the database
                const existingProduct = await ProductDataModel.findOne({ id });

                if (!existingProduct) {
                    // If product doesn't exist, insert it into the database
                    await ProductDataModel.create(product);
                    console.log(`Added product with ID ${id} to the database.`);
                } else {
                    console.log(`Product with ID ${id} already exists in the database.`);
                }
            } catch (error) {
                console.error("Error occurred while processing product:", error);
            }
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
