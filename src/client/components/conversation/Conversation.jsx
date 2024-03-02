import React, { useState } from "react";
import { useEffect } from "react";
import "./Conversation.css"
import { serverPath } from "../../../utils/urls";
import tempImage from "@client/assets/images/profile.png"

const Conversation = ({ data, currentUser, online }) => {

  const [userData, setUserData] = useState(null)

  useEffect(()=> {

    const memberDetails = data.members.find(member => member._id !== currentUser)
    setUserData(memberDetails)
  }, [])
  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={userData?.profilePhoto ? serverPath + userData?.profilePhoto : tempImage}
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{fontSize: '0.8rem'}}>
            <span>{userData?.name?.first} {userData?.name?.last}</span>
            <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;