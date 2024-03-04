import urls, { basePath, serverPath } from '@utils/urls'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectSession } from '../auth/authSlice'
// @ts-ignore
import tempImage from "@client/assets/images/profile.png"
import { toast } from 'react-toastify'

const AluminiRequestCard = (props) => {
    const acceptRequestUrl = basePath + urls.request.alumni.replace(':request', props.cr?._id).replace(':status', "accept")
    const ignoreRequestUrl = basePath + urls.request.alumni.replace(':request', props.cr?._id).replace(':status', "reject")
    const session = useSelector(selectSession);
    const clickHandler = async () => {
        const res = await axios.put(acceptRequestUrl, {}, {
            headers: {
                authorization: `Bearer ${session.token}`,
            }
        })
        if(res?.status === 200){
            toast.success("Request accepted Successfully")
        }
        else{
            toast.error("Something went wrong!!")
        }
        props.requestMutate()
    }
    const ignoreHandler = async () => {
        try {
            const res = await axios.put(ignoreRequestUrl, {}, {
                headers: {
                    authorization: `Bearer ${session.token}`,
                }
            });
            if(res?.status === 200){
                toast.error("Ignored Request Successfully")
            }
            else{
                toast.error("Something went wrong!!")
            }
            props.requestMutate();
        } catch (error) {
            console.error("Error deleting connection request:", error);
        }
    };
    
    return (
        <>
            <div className="invitation">
                <Link to={`/profile/${props?.user?._id}`}>
                    <div className="userProfile networkUserProfile">
                        <div className="profileImgPost">
                            <img
                                src={props.user?.profilePhoto ? serverPath + props.user?.profilePhoto : tempImage}
                                alt="profileImg"
                            />
                        </div>
                        <div className="userInfo">
                            <h5>{props?.user?.name?.first} {props?.user?.name?.last}</h5>
                            <p>{props?.user?.bio}</p>
                        </div>
                    </div>
                </Link>
                <a href={serverPath + props?.cr?.document} style={{fontSize:"1rem"}} target='_blank'>Document</a>
                <div className="networkOption">
                    <button className="noborderButton" type='button' onClick={ignoreHandler}>Reject</button>
                    <button className="text-button" style={{fontSize:"1rem"}} type='button' onClick={clickHandler}>Accept</button>
                </div>
            </div>
        </>
    )
}

export default AluminiRequestCard