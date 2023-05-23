 require('dotenv').config()
const mongoose=require("mongoose");
 
 const connectDb=async()=>{
   

     await mongoose.connect(process.env.DB_Url,{
      useNewUrlParser:true,
      useUnifiedTopology:true
        
    })
    console.log("connected to the db")
 }
 
 module.exports=connectDb;