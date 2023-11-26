import React from 'react'
import { Link } from 'react-router-dom'

const RequestedUser = (props) => {
    return (
        <>
            <div className="invitation">
                <Link to={`/profile/${props.user?.id}`}>
                    <div className="userProfile networkUserProfile">
                        <div className="profileImgPost">
                            <img
                                src={props.user?.details.profileImageUrl}
                                alt="profileImg"
                            />
                        </div>
                        <div className="userInfo">
                            <h5>{props.user?.details.firstName} {props.user?.details.lastName}</h5>
                            <p>{props.user?.details.userBio}</p>
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