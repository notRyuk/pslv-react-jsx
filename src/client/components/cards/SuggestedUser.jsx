import React from 'react'
import { Link } from 'react-router-dom'
import urls, { basePath, serverPath } from '@utils/urls'
import { useSelector } from 'react-redux'
import { selectSession } from '../auth/authSlice'
import axios from 'axios'
import tempImage from "@client/assets/images/profile.png"
import { toast } from 'react-toastify'

const SuggestedUser = (props) => {
    const sendRequestUrl = basePath + urls.request.create
    const session = useSelector(selectSession)
    const clickHandler = async () => {
        const data = new FormData()
        data.append("to", props.user?._id)
        data.append("type", "Mutual")
        const res = await axios.post(sendRequestUrl, data, {
            headers: {
                authorization: `Bearer ${session.token}`,
                "Content-Type": 'multipart/form-data',
            }
        })
        if(res?.status === 200){
            toast.success("Sent Request Successfully")
        }
        else{
            toast.error("Something went wrong!!")
        }
        props.suggestMutate()
    }
    return (
        <>
            <div className="connectSuggestion">
                <Link to={`/profile/${props.user?._id}`}>
                    <div className="connectProfile">
                        <img src={props?.user?.profilePhoto ? serverPath + props.user?.profilePhoto : tempImage} alt="personImg" />
                        <div className="connectInfo">
                            <strong>{props.user?.name.first} {props.user?.name.last}</strong>
                            <small>{props.user?.bio}</small>
                        </div>
                    </div>
                </Link>
                <button type='button' onClick={clickHandler}>Connect</button>
            </div>
        </>
    )
}

export default SuggestedUser