import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = (props) => {
    return (
        <>
            <div className="card">
                <div className="userProfile">
                    <div className="profileImgPost">
                        <img src={''} alt="profileImg" />
                    </div>
                    <div className="userInfo">
                        <h5>Tushar pathak</h5>
                        <p>web developer</p>
                    </div>
                </div>
                <div className="caption">
                    <p>post caption</p>
                </div>
                {/* {post.postDetails.imageUrl && ( */}
                <div className="imagePost">
                    <img src={''} alt="post" />
                </div>
                {/* )} */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <div className="specialLink">
                        <Link to="#" data-bs-toggle="modal" data-bs-target={`#likeModal${'id'}`}>
                            4 Likes
                        </Link>
                    </div>
                </div>

                {/* code for the likeModal */}

                <div className="modal fade mt-5" id={`likeModal${'id'}`} tabIndex="-1" aria-labelledby="articleModalLabel" aria-hidden="true" style={{ color: 'black' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Number of Likes</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="allLikes" style={{ display: 'flex', flexDirection: 'column' }}>
                                    {/* {post.userDetails.length > 0 ? (
                                        post.userDetails.map(postUser => (
                                            <div className="userProfile" key={postUser._id}>
                                                <div className="profileImgPost">
                                                    <img src={postUser.imageUrl} alt="profileImg" />
                                                </div>
                                                <div className="userInfo">
                                                    <h5>{postUser.firstname} {postUser.lastname}</h5>
                                                    <p>{postUser.bio}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <h1>No Likes Yet</h1>
                                    )} */}
                                    <div className="userProfile" key={1}>
                                        <div className="profileImgPost">
                                            <img src={''} alt="profileImg" />
                                        </div>
                                        <div className="userInfo">
                                            <h5>user who liked name</h5>
                                            <p>user who liked bio</p>
                                        </div>
                                    </div>
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
                    <button className="linkButton" type="submit">
                        <i className="fa-regular fa-thumbs-up"></i> Like
                    </button>
                    {/* =============================================================== end ============================================================ */}
                    <div className="specialLink">
                        <Link to="#" data-bs-toggle="modal" data-bs-target={`#commentModal${'id'}`}>
                            <i className="fa-regular fa-comment"></i> Comment
                        </Link>
                    </div>

                    {/* code for the commentModal */}

                    <div className="modal fade mt-5" id={`commentModal${'id'}`} tabIndex="-1" aria-labelledby="articleModalLabel" aria-hidden="true" style={{ color: 'black' }}>
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
                                                <img src={''} alt="profileImg" />
                                            </div>

                                            {/* =======================================implement api for comment on post=========================================== */}

                                            <form style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', width: '100%' }}>
                                                <input type="text" name="comment" placeholder="Add a comment" style={{ border: '1px solid black', width: '100%' }} />
                                                <button type="submit" className="submitButton" style={{ padding: '1rem', borderRadius: '50%' }}><i className="fa-sharp fa-solid fa-paper-plane"></i></button>
                                            </form>
                                            {/*===================================================== end ===========================================================*/}
                                        </div>
                                        {/* {post.commentDetails.length > 0 ? (
                                            post.commentDetails.map(postUser => (
                                                <div className="userProfile" key={postUser._id}>
                                                    <div className="profileImgPost">
                                                        <img src={postUser.commentUser.imageUrl} alt="profileImg" />
                                                    </div>
                                                    <div className="userInfo" style={{ borderRadius: '10px', backgroundColor: 'rgb(231, 231, 231)', padding: '0.25rem 0.5rem', width: '80%' }}>
                                                        <h6 style={{ color: 'rgb(129, 129, 129)', margin: '0' }}>{postUser.commentUser.firstname} {postUser.commentUser.lastname}</h6>
                                                        <p style={{ color: 'rgb(129, 129, 129)', fontSize: '0.75rem' }}>{postUser.commentUser.bio}</p>
                                                        <p style={{ marginTop: '1rem' }}>{postUser.comment}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <h1>No Comments Yet</h1>
                                        )} */}
                                        <div className="userProfile" key={1}>
                                            <div className="profileImgPost">
                                                <img src={''} alt="profileImg" />
                                            </div>
                                            <div className="userInfo" style={{ borderRadius: '10px', backgroundColor: 'rgb(231, 231, 231)', padding: '0.25rem 0.5rem', width: '80%' }}>
                                                <h6 style={{ color: 'rgb(129, 129, 129)', margin: '0' }}>commented user name</h6>
                                                <p style={{ color: 'rgb(129, 129, 129)', fontSize: '0.75rem' }}>commented users bio</p>
                                                <p style={{ marginTop: '1rem' }}>commented users comment</p>
                                            </div>
                                        </div>
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