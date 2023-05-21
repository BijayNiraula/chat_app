import { useEffect, useState } from "react";
import io from "socket.io-client"
import ChatBody from "./Component/ChatBody";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const socket=io.connect("http://localhost:8000")
const joinRoom=(d)=>{
  
  localStorage.setItem('info',JSON.stringify(d))
  socket.emit("join",d)
}
function App() {
  const [state, setstate] = useState({});
  const join=(e)=>{
    e.preventDefault();
    var id=e.target[0].value
    var email=e.target[1].value

    var name=e.target[2].value
     joinRoom({name,id,email})
    setstate({name,id,email})
  }

  useEffect((e)=>{
    let data=JSON.parse(localStorage.getItem('info'))
    if(data){
      joinRoom(data)
      setstate(data)
    }
    


  },[])
  if(!state){
    return(

      <div className=" join-room d-flex align-items-center justify-content-center row">
         <ToastContainer />
        <div className="col-3 py-2   border border-dark border-3 " >
         <h3 className="text-center fw-bold text-secondary">
          Join Room
         </h3>
         <hr />
         <form action="d-flex justify-content-center w-100 " onSubmit={join}>
          <div className="d-flex justify-content-center">
          <input className="py-1 px-2" type="text" placeholder="Enter room id" required />

          </div>
          <div className="d-flex justify-content-center mt-3">
          <input  required type="email" className="py-1 px-2" placeholder="Enter your email" />

          </div>
          <div className="d-flex justify-content-center mt-3">
          <input  required type="name" className="py-1 px-2" placeholder="Enter your name" />

          </div>

          
          <br />
          <div className="d-flex justify-content-center">
          <button className="px-3 mb-3" >Join</button>

          </div>
         </form>
    

        </div>
      </div>
    )
  }
else{   
  return (
    <>
  <ToastContainer />
   <ChatBody setstate={setstate}  state={state} socket={socket}/>
    </>
  )
}}

export default App
