const mongoose=require("mongoose");


const messageSchema= new mongoose.Schema({
    name:{
        type:String,

    },date:{
        type:Number,
        default:Date.now()
        
    },email:{
        type:String,
        
    },message:{
        type:String,
        
    },
    id:{
        type:String,
    }
})


const Message=mongoose.model('Message',messageSchema)

module.exports=Message;