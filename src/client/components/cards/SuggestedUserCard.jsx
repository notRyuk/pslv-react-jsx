import React from 'react'
import { Link } from 'react-router-dom'

const SuggestedUserCard = (props) => {
    return (
        <>
                <div className="card profileCard suggestedCard" key={props.user?.id}>
                    <div className="cover"></div>
                    <Link to={`/profile/${props.user?.id}`} style={{zIndex : "2"}}>
                        <div className="profileInfo">
                            <img
                                src={props.user?.details.profileImageUrl}
                                alt="profileImg"
                                className="profileImg"
                            />
                            <strong className="userName">{props.user?.details.firstName} {props.user?.details.lastName}</strong>
                            <small className="userProfession">{props.user?.details.userBio}</small>
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