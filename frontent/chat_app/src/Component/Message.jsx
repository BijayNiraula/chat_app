import React from 'react'
import { memo } from 'react'
function Message(props) {
  if(props.data.email==props.userEmail){

  return (
 
    <div className=' d-flex flex-column row my-3  px-4' style={{alignItems:"end"}} >
        <div className="me     message  " >
           {props.data.message}
        </div>
       
        </div>


  )
  }else{
     return (

      <div className=' d-flex flex-column row  my-3   px-4 ' style={{alignItems:"start"}} >
      <div className="    message  ">
      {props.data.message}

      </div>
    <small className='ms-2 fw-bold'>{props.data.name}</small>
     
      </div>

     )
  }

}

export default memo(Message)