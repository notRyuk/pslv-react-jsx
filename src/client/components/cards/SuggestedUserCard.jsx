import React from 'react'
import { Link } from 'react-router-dom'
import { basePath, serverPath } from '@utils/urls'

const SuggestedUserCard = (props) => {
    return (
        <>
                <div className="card profileCard suggestedCard" key={props.user?._id}>
                    <div className="cover"></div>
                    <Link to={`/profile/${props.user?._id}`} style={{zIndex : "2"}}>
                        <div className="profileInfo">
                            <img
                                src={serverPath + props.user?.profilePhoto}
                                alt="profileImg"
                                className="profileImg"
                            />
                            <strong className="userName">{props.user?.name.first} {props.user?.name.last}</strong>
                            <small className="userProfession">{props.user?.bio}</small>
                            {/* <span>{props.institute}</span> */}
                        </div>
                    </Link>
                    <div>
                        <button className="text-button">
                            <i className="fa-solid fa-user-plus"></i> Connect
                        </button>
                    </div>
                </div>
        </>
    )
}

export default SuggestedUserCard