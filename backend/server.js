const mongoose=require("mongoose")
const mongouri="mongodb+srv://20211a05c2:vishu123@cluster0.kb860pu.mongodb.net/"
mongoose.connect(mongouri)
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed");
})
