import React from 'react'
import { Link } from 'react-router-dom'

const SuggestedUser = (props) => {
    return (
        <>
            {/* {console.log('from suggested user')} */}
            <div className="connectSuggestion">
                <Link to={`/profile/${props.user?.id}`}>
                    <div className="connectProfile">
                        <img src={props.user?.details.profileImageUrl} alt="personImg" />
                        <div className="connectInfo">
                            <strong>{props.user?.details.firstName} {props.user?.details.lastName}</strong>
                            <small>{props.user?.details.userBio}</small>
                        </div>
                    </div>
                </Link>
                <button >Connect</button>
            </div>
        </>
    )
}

export default SuggestedUser