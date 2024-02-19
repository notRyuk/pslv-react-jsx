import React from 'react'
import { Link } from 'react-router-dom'
import { basePath, serverPath } from '@utils/urls'
import tempImage from "@client/assets/images/profile.png"

const ConnectedUser = (props) => {
    return (
        <>
            <Link to={`/profile/${props.user?._id}`}>
                <div className="connectSuggestion">
                    <div className="connectProfile">
                        <img src={props.user?.profilePhoto ? serverPath + props.user?.profilePhoto : tempImage} alt="personImg" />
                        <div className="connectInfo">
                            <strong>{props.user?.name.first} {props.user?.name.last}</strong>
                            <small>{props.user?.bio}</small>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default ConnectedUser