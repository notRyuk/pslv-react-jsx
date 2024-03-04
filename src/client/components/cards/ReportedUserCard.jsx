import urls, { basePath, serverPath } from '@utils/urls'
import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectSession } from '../auth/authSlice'
import tempImage from "@client/assets/images/profile.png"
import { toast } from 'react-toastify'

const ReportedUserCard = (props) => {
  const session = useSelector(selectSession)
  const ignoreHandler = async()=>{
    const res = await axios.delete(basePath + urls.report.deleteById.replace(":id", props?.report?.user?._id), {
      headers: {
        authorization: `Bearer ${session.token}`
      }
    })
    if(res?.status === 200){
      props.mutate();
      toast.success("Ignored Reported User Successfully")
    }
    else{
      toast.error("Something went wrong!!")
    }
  }
  const clickHandler = async()=>{
    const res1 = await axios.delete(basePath + urls.user.delete.replace(":id", props?.report?.user?._id), {
      headers: {
        authorization: `Bearer ${session.token}`
      }
    })
    const res2 = await axios.delete(basePath + urls.report.deleteById.replace(":id", props?.report?.user?._id), {
      headers: {
        authorization: `Bearer ${session.token}`
      }
    })
    if(res1?.status === 200 && res2?.status === 200){
      props.mutate();
      toast.success("Removed User Successfully")
    }
    else{
      toast.error("Something went wrong!!")
    }
  }
  return (
    <>
      <div className="invitation">
                <Link to={`/profile/${props?.report?.user?._id}`}>
                    <div className="userProfile networkUserProfile">
                        <div className="profileImgPost">
                            <img
                                src={props?.report.user?.profilePhoto ? serverPath + props?.report.user?.profilePhoto : tempImage}
                                alt="profileImg"
                            />
                        </div>
                        <div className="userInfo">
                            <h5>{props?.report?.user?.name?.first} {props?.report?.user?.name?.last}</h5>
                            <p>{props?.report?.user?.bio}</p>
                        </div>
                    </div>
                </Link>
                <div className="networkOption">
                    <button className="noborderButton" type='button' onClick={ignoreHandler}>Ignore</button>
                    <button className="text-button" style={{fontSize:"1rem"}} type='button' onClick={clickHandler}>Remove</button>
                </div>
            </div>
    </>
  )
}

export default ReportedUserCard