const { default: mongoose } = require("mongoose");
const fs=require("fs");
const db=require("../db.js");

require('./UserDataSchema');
const  UserData = mongoose.model('UserData') ;
const data=JSON.parse(fs.readFileSync("D:/E-SHOP/backend/UserData/Userdata.json",'Utf8'));


UserData.insertMany(data)
  .then(() => {
    console.log("Data inserted successfully");
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
  });
