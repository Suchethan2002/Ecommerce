const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const jwt_secret =
  "siorehamh200323[]itsu}{||]ha--63049398whi279101nwg149diwgu002";

const mongoURI =
  "mongodb+srv://20211a05c2:Shiva2k3@eco.4gf33f5.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("connected to database");
  })
  .catch((e) => console.log(e));

require("./userRegistration");
const User = mongoose.model("UserInfo");
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const encryptPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      res
        .status(400)
        .send({ error: "user exist", message: "User already exists" });
    } else {
      await User.create({
        name,
        email,
        password: encryptPassword,
      });

      res.send({ status: "ok" });
    }
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log(user.password);
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token=jwt.sign({email:user.email},jwt_secret);
    if(res.status(200))
    {
      return res.json({status:"ok",data:user});
    }
    else{
      return res.json({error:"error"});
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

app.post("/userData",async(req,res)=>{
  const {token}=req.body;
  try{
    const user=jwt.verify(token,jwt_secret);
    const useremail=user.email;
    User.findOne({email:useremail})
    .then((data)=>{
      res.send({status:"ok", data:token});
    })
    .catch((error)=>{
      res.send({status:"error",data:error})
    });
  }catch(error){}
});

app.listen(5000, () => {
  console.log("server Started");
});
