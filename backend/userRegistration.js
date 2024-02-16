const { Schema,model } = require("mongoose");

const UserSchema=new Schema(
  {
    name:String,
    email:{type : String ,unique:true, required : true},
    password :{ type: String ,required :true}

  },
  {
    collection:"UserInfo",
  }
);

module.exports=model("UserInfo", UserSchema);