import React, { useEffect } from 'react'
import Message from './Message'
import { useState } from 'react';
import { useRef } from 'react';
import tune from "../assets/ring.wav"
import { ToastContainer, toast } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner'
import { memo } from 'react';
  const sound=()=>{
    
     let audio=new Audio(tune)
     audio.play();
  }

 

function ChatBody(props) {
  const [messages, setMessages] = useState([]);
  const chatArea=useRef()
 const loader=useRef()
  const fetchOldMessage=async(info)=>{
    const fetchData= await fetch("http://localhost:8000",{
      method:"POST",
      body:info,
      headers:{
        'Content-Type':"application/json"
      }
      
     })
     const data=await fetchData.json();
    setMessages(data)
    loader.current.style.display="none"
    
  }
  const logout=()=>{
    localStorage.removeItem("info")
     props.setstate(false)
  }
  const send=(e)=>{
    e.preventDefault();
    var message=e.target[0].value;

    setMessages(d=>{
      return [...d,{message:message,name:props.state.name,email:props.state.email}]
    })
    sound();
    props.socket.emit("send_message",{name:props.state.name,email:props.state.email,message:message})
  }


  

useEffect(()=>{

  props.socket.on("receive_message",(message)=>{
    //  chatArea.current.insertAdjacentHTML('beforeend', `<div id="box></div>`);
       setMessages(d=>{
       return (  [...d,{message:message.message,name:message.name,email:message.email}])
       })
       sound()
    })
    props.socket.on("join_info",(d)=>{
      toast.info(`${d} - Join the Chat`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true, 
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
    })

    const data=    fetchOldMessage(localStorage.getItem('info'));
    console.log(data)

  
},[])
 
   useEffect(()=>{
     var height= chatArea.current.scrollHeight;
      chatArea.current.scrollTo(0,height)

   },[messages])

   console.log("rerender")
  return (
  <div className="border-dark row width-100vh  chat-body    d-flex justify-content-center ">
    <div className="loader" ref={loader} style={{display:"flex"}}>
    <InfinitySpin 
  width='200'
  color="red"

/>

    </div>
   <div className='col-md-6 col-11  border border-dark border-3 body border-dark p-0  ' >
   <div className="w-100 bg-dark  row text-light fs-4 ps-3 w-100  py-1 ">
   <div className="col-6">
    Chatty
    </div>
    <div className="col-6 d-flex justify-content-end align-items-center">
      <button className="btn btn-outline-light" onClick={logout}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
  <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
</svg>
<strong className='ms-2 ' style={{fontSize:"14px"}}>
Logout

</strong>
      </button>
  
    </div>
  
     

   </div>
   <div className='border border-dark chat-area ' ref={chatArea} >
    <div>
      {
        setMessages.length!=0?
        messages.map(data=>{
          return(
             <Message key={data.message} userEmail={props.state.email} data={data}/>

          )
        }):`<p className="text-center">NoConversation Start </p>`
          
      }
    </div>
  
   </div>

<div className='border border-dark bg-light py-3'>
<form action="" onSubmit={send} className='d-flex justify-content-around px-1 '>
    <input required type="text" placeholder='type message...' className='py-1  px-2 py-1 input-area' style={{width:"90%"}}/>
    <button className='fw-bold btn'><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi text-primary bi-send-fill" viewBox="0 0 16 16">
  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
</svg></button>
   </form>
</div>
   </div>
   
  </div>
  )
}

export default memo(ChatBody)