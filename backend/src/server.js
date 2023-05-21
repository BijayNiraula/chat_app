const express=require("express");
const{Server}=require('socket.io');
const {createServer}=require("http");
const app=express();
const cors=require("cors")
app.use(express.json())
const port=process.env.port ||8000;
  
app.use(cors());
const server=createServer(app);
const io=new Server(server,{
    cors:"http://127.0.0.1:5173/",
    methods:["GET","POST"],
},)

io.on("connection",(socket)=>{
    console.log("connected successfully ")

    socket.on('join',(data)=>{ 
        console.log("joined successfully")
        socket.join(data.id)
        socket.to(data.id).emit("join_info",data.email)
        socket.on("send_message",(message)=>{
          socket.to(data.id).emit("receive_message",message);
      })
})})








const start=async()=>{
    server.listen(port,()=>{
        console.log("server is running in port "+port);
    })
}
start();






