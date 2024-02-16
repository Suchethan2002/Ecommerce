const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://20211a05c2:Shiva2k3@eco.4gf33f5.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

module.exports = mongoose;
