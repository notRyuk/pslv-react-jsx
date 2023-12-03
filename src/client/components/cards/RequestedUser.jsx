import React from 'react'
import { Link } from 'react-router-dom'
import { basePath, serverPath } from '@utils/urls'

const RequestedUser = (props) => {
    return (
        <>
            <div className="invitation">
                <Link to={`/profile/${props.user?._id}`}>
                    <div className="userProfile networkUserProfile">
                        <div className="profileImgPost">
                            <img
                                src={serverPath + props.user?.profilePhoto}
                                alt="profileImg"
                            />
                        </div>
                        <div className="userInfo">
                            <h5>{props.user?.name.first} {props.user?.name.last}</h5>
                            <p>{props.user?.bio}</p>
                        </div>
                    </div>
                </Link>
                <div className="networkOption">
                    <button className="noborderButton">Ignore</button>
                    <button className="text-button">Accept</button>
                </div>
            </div>
        </>
    )
}

export default RequestedUser