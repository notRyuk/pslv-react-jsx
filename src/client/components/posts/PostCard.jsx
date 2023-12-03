import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import urls, { basePath, serverPath } from '@utils/urls'
import PostCarousel from './carousel'
import { useSelector } from "react-redux";
import { selectSession, selectLoggedInUser } from "@client/components/auth/authSlice";
import axios from "axios";

const PostCard = (props) => {
    const [likeInteract, setLikeIneract] = useState([])
    const [commentInteract, setCommentIneract] = useState([])
    const [comment, setComment] = useState("")
    const likeInteractionsUrl = basePath + urls.post.interactions.replace(':post', props.post._id).replace(':type', "like")
    const likeInteractUrl = basePath + urls.post.interact.replace(':post', props.post._id).replace(':type', "like")
    const commentInteractionsUrl = basePath + urls.post.interactions.replace(':post', props.post._id).replace(':type', "comment")
    const commentInteractUrl = basePath + urls.post.interact.replace(':post', props.post._id).replace(':type', "comment")
    const session = useSelector(selectSession)
    const loggedInUser = useSelector(selectLoggedInUser)
    useEffect(() => {
        (async () => {
            const res = await axios.get(likeInteractionsUrl, {
                headers: {
                    authorization: `Bearer ${session.token}`
                },
            })
            // console.log(res.data);   
            setLikeIneract(res.data)
        })()
    }, [likeInteract])
    const likeHandler = async () => {
        const res = await axios.put(likeInteractUrl, {}, {
            headers: {
                authorization: `Bearer ${session.token}`,
            },
        })
        // console.log(res);
    }

    const commentHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(commentInteractUrl, {
                "comment": comment,
            }, {
                headers: {
                    authorization: `Bearer ${session.token}`,
                },
            });
            console.log(res);
        } catch (error) {
            console.error("Error while sending comment:", error);
        }
        setComment("")
    };

    useEffect(() => {
        (async () => {
            const res = await axios.get(likeInteractionsUrl, {
                headers: {
                    authorization: `Bearer ${session.token}`
                },
            })
            // console.log(res.data);   
            setLikeIneract(res.data)
        })()
    }, [likeInteract])
    useEffect(() => {
        (async () => {
            const res = await axios.get(commentInteractionsUrl, {
                headers: {
                    authorization: `Bearer ${session.token}`
                },
            })
            // console.log(res.data);   
            setCommentIneract(res.data)
        })()
    }, [commentInteract])
    return (
        <>
            {/* {console.log(props.post)} */}
            <div className="card">
                <div className="userProfile">
                    <div className="profileImgPost">
                        <img src={serverPath + props.post?.user.profilePhoto} alt="profileImg" />
                    </div>
                    <div className="userInfo">
                        <h5>{props.post?.user.name.first} {props.post?.user.name.last}</h5>
                        <p>{props.post?.user.bio}</p>
                    </div>
                </div>
                <div className="caption">
                    <p>{props.post?.content.text}</p>
                </div>
                {props.post?.content.media.length !== 0 && (
                    <PostCarousel images={props.post?.content.media} />
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <div className="specialLink">
                        <Link to="#" data-bs-toggle="modal" data-bs-target={`#likeModal${props.post?._id}`}>
                            {likeInteract.length} Likes
                        </Link>
                    </div>
                </div>

                {/* code for the likeModal */}

                <div className="modal fade mt-5" id={`likeModal${props.post?._id}`} tabIndex="-1" aria-labelledby="articleModalLabel" aria-hidden="true" style={{ color: 'black' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{likeInteract.length} Likes</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="allLikes" style={{ display: 'flex', flexDirection: 'column' }}>
                                    {
                                        likeInteract.length > 0 ?
                                            likeInteract?.map((like) =>
                                                <div className="userProfile" key={like?.user._id}>
                                                    <div className="profileImgPost">
                                                        <img src={serverPath + like?.user.profilePhoto} alt="profileImg" />
                                                    </div>
                                                    <div className="userInfo">
                                                        <h5>{like?.user.name.first} {like?.user.name.last}</h5>
                                                        <p>{like?.user.bio}</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <h1>No Likes Yet</h1>
                                            )
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="actionBar">
                    {/* =======================================================implement like api hit ==================================================*/}
                    <button className="linkButton" onClick={likeHandler}>
                        <i className={`fa-${likeInteract.map(like => like?.user._id).includes(session?.user._id)?"solid":"regular"} fa-thumbs-up`}></i> Like
                    </button>
                    {/* =============================================================== end ============================================================ */}
                    <div className="specialLink">
                        <Link to="#" data-bs-toggle="modal" data-bs-target={`#commentModal${props.post?._id}`}>
                            <i className="fa-regular fa-comment"></i> Comment
                        </Link>
                    </div>

                    {/* code for the commentModal */}

                    <div className="modal fade mt-5" id={`commentModal${props.post?._id}`} tabIndex="-1" aria-labelledby="articleModalLabel" aria-hidden="true" style={{ color: 'black' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Comments</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="allLikes" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div className="postBox">
                                            <div className="profileImgPost">
                                                <img src={serverPath + loggedInUser?.profilePhoto} alt="profileImg" />
                                            </div>

                                            <form style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', width: '100%' }} onSubmit={commentHandler}>
                                                <input type="text" name="comment" placeholder="Add a comment" style={{ border: '1px solid black', width: '100%' }} value={comment} onChange={(e) => setComment(e.target.value)} />
                                                <button type="submit" className="submitButton" style={{ padding: '1rem', borderRadius: '50%' }}><i className="fa-sharp fa-solid fa-paper-plane"></i></button>
                                            </form>
                                            {/*===================================================== end ===========================================================*/}
                                        </div>
                                        {
                                            commentInteract.length > 0 ? (
                                                commentInteract.map((comment, index) => (
                                                    <div className="userProfile" key={index}>
                                                        <div className="profileImgPost">
                                                            <img src={serverPath + comment?.user.profilePhoto} alt="profileImg" />
                                                        </div>
                                                        <div className="userInfo" style={{ borderRadius: '10px', backgroundColor: 'rgb(231, 231, 231)', padding: '0.25rem 0.5rem', width: '80%' }}>
                                                            <h6 style={{ color: 'rgb(129, 129, 129)', margin: '0' }}>{comment?.user.name.first} {comment?.user.name.last}</h6>
                                                            <p style={{ color: 'rgb(129, 129, 129)', fontSize: '0.75rem' }}>{comment?.user.bio}</p>
                                                            <p style={{ marginTop: '1rem' }}>{comment?.comment}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (<h1>No Comments Yet</h1>)
                                        }
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*================================================ inka kya krna h =========================================*/}
                    <form>
                        <button className="linkButton" type="submit">
                            <i className="fa-sharp fa-solid fa-arrows-rotate"></i> Repost
                        </button>
                    </form>
                    <form>
                        <button className="linkButton" type="submit">
                            <i className="fa-sharp fa-solid fa-paper-plane"></i> Send
                        </button>
                    </form>
                    {/*===================================================== end ================================================*/}
                </div>
            </div>
        </>
    )
}

export default PostCard