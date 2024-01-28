const { default: mongoose } = require("mongoose");

const newSchema=new mongoose.Schema(
    {
    username:{
       type:String,
       required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    leetcode_username:{
        type: String,
        required:true
    },
    hackerrank_username:{
        type: String,
        required:true
    },
    geeksforgeeks_username:{
        type: String,
        required:true 
    },
},
    {
        collection:"UserInfo",
    }

);

mongoose.model("UserInfo", newSchema);