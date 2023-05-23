const express=require("express");
const{Server}=require('socket.io');
const {createServer}=require("http");
const cors=require("cors")
const connectDb=require("./Db/connectDb")
const Message=require("./model/message")
const app=express();


app.use(express.json())
const port=process.env.port ||8000;
  
app.use(cors());
const server=createServer(app);
const io=new Server(server,{
    cors:"https://chattu.netlify.app/",
    methods:["GET","POST"],
},)

io.on("connection",(socket)=>{
    console.log("connected successfully ")

    socket.on('join',(data)=>{ 
        console.log("joined successfully")
        socket.join(data.id)
        socket.to(data.id).emit("join_info",data.email)
        socket.on("send_message",async(message)=>{
          socket.to(data.id).emit("receive_message",message);
         await Message.create({name:message.name,email:message.email,message:message.message,id:data.id})
      })
})})




app.post("/",async(req,res)=>{
    console.log(req.body)
     const id= req.body.id;
    const data=await Message.find({id});
    res.send(data);

})




const start=async()=>{
    try{
        await connectDb()
        server.listen(port,()=>{
            console.log("server is running in port "+port);
        })
    }catch(e){
        console.log(e)
    }
   
}
start();






