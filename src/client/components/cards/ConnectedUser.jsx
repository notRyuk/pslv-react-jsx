import React from 'react'
import { Link } from 'react-router-dom'

const ConnectedUser = (props) => {
    return (
        <>
            <Link to={`/profile/${props.user?.id}`}>
                <div className="connectSuggestion">
                    <div className="connectProfile">
                        <img src={props.user?.details.profileImageUrl} alt="personImg" />
                        <div className="connectInfo">
                            <strong>{props.user?.details.firstName} {props.user?.details.lastName}</strong>
                            <small>{props.user?.details.userBio}</small>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default ConnectedUser