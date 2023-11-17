import React from 'react'
import ChatComponent from "@client/components/messages";


const connectedUsers = []; // Initialize as an empty array
const user = {
  imageUrl: "", // Provide some default values or fetch from your data
  firstname: "",
  lastname: "",
};

const index = () => {
  return (
    <ChatComponent connectedUsers={connectedUsers} user={user}></ChatComponent>
  )
}

export default index