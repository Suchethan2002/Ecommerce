const { default: mongoose } = require("mongoose");

const UserSchema=new mongoose.Schema(
  {
    name:String,
    email:{type : String ,unique:true, required : true},
    password :{ type: String ,required :true}

  },
  {
    collection:"UserInfo",
  }
);

mongoose.model("UserInfo", UserSchema);