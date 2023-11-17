import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const HomeComponent = ({ role, user, connection, users, posts }) => {
    return (
        <>
            {role === 'admin' ? (
                <h1>ADMIN</h1>
            ) : (
                <main className="mainContainer">

                                                                                    {/* left profile container  */}

                    <div className="left-content content">
                        <div className="card profileCard">
                            <div className="cover"></div>
                            <div className="profileInfo">
                                <img src={user.imageUrl} alt="profileImg" className="profileImg" />
                                <strong className="userName">
                                    {user.firstname} {user.lastname} <span style={{ textTransform: 'capitalize' }}>({role})</span>
                                </strong>
                                <small className="userProfession">{user.bio}</small>
                                <span>{user.institute}</span>
                            </div>
                            <div className="connection">
                                <strong>{connection}</strong>
                                <small>Connections</small>
                            </div>
                            <div className="specialLink">
                                <Link to="/profile">My Profile</Link>
                            </div>
                        </div>

                                                                                    {/* left connect container */}

                        <div className="card left-group">
                            <h5>Connect with more people.....</h5>
                            {users.map((reqUser) => (

                                
                                // ===================================================make the api hit for connecting with people========================================================
                                <form action="/api/connection/create" method="post" key={reqUser.user}>
                                    <div className="connectSuggestion">
                                        <Link to={`/profile/${reqUser.user}`}>
                                            <div className="connectProfile">
                                                <img src={reqUser.imageUrl} alt="personImg" />
                                                <div className="connectInfo">
                                                    <strong>{reqUser.firstname} {reqUser.lastname}</strong>
                                                    <small>{reqUser.bio}</small>
                                                </div>
                                            </div>
                                        </Link>
                                        <input type="hidden" name="from" value={user.user} />
                                        <input type="hidden" name="to" value={reqUser.user} />
                                        <input type="hidden" name="type" value="MUTUAL" />
                                        <button type="submit">Connect</button>
                                    </div>
                                </form>
                                // ================================================================= end =================================================================================
                            ))}
                            <div className="specialLink">
                                <Link to="/network">Show More</Link>
                            </div>
                        </div>
                    </div>

                                                                                            {/* middle container header */}

                    <div className="center-content content">
                        <div className="card">
                            <div className="postBox">
                                <div className="profileImgPost">
                                    <img src={user.imageUrl} alt="profileImg" />
                                </div>
                                <input type="text" placeholder="Start a post" />
                            </div>
                            <div className="buttonBox">
                                <div className="specialLink">
                                    <Link to="#" data-bs-toggle="modal" data-bs-target="#photoModal"><i className="fa-regular fa-image"></i> Photo</Link>
                                </div>
                                <div className="specialLink">
                                    <Link to="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-brands fa-youtube"></i> Video</Link>
                                </div>
                                <div className="specialLink">
                                    <Link to="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-regular fa-calendar-days"></i> Event</Link>
                                </div>
                                <div className="specialLink">
                                    <Link to="#" data-bs-toggle="modal" data-bs-target="#articleModal"><i className="fa-regular fa-newspaper"></i> Write an article</Link>
                                </div>
                            </div>
                        </div>

                                                                                            {/* middle container posts */}

                        {posts.length > 0 ? (
                            posts.map(post => (
                                <div className="card" key={post.postDetails._id}>
                                    <div className="userProfile">
                                        <div className="profileImgPost">
                                            <img src={post.postDetails.user.imageUrl} alt="profileImg" />
                                        </div>
                                        <div className="userInfo">
                                            <h5>{post.postDetails.user.firstname} {post.postDetails.user.lastname}</h5>
                                            <p>{post.postDetails.user.bio}</p>
                                        </div>
                                    </div>
                                    <div className="caption">
                                        <p>{post.postDetails.caption}</p>
                                    </div>
                                    {post.postDetails.imageUrl && (
                                        <div className="imagePost">
                                            <img src={post.postDetails.imageUrl} alt="post" />
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                                        <div className="specialLink">
                                            <Link to="#" data-bs-toggle="modal" data-bs-target={`#likeModal${post.postDetails._id}`}>
                                                {post.postDetails.postResponse.likes.numLikes} Likes
                                            </Link>
                                        </div>
                                    </div>

                                                                                            {/* code for the likeModal */}

                                    <div className="modal fade mt-5" id={`likeModal${post.postDetails._id}`} tabIndex="-1" aria-labelledby="articleModalLabel" aria-hidden="true" style={{ color: 'black' }}>
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">{post.postDetails.postResponse.likes.numLikes} Likes</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="allLikes" style={{ display: 'flex', flexDirection: 'column' }}>
                                                        {post.userDetails.length > 0 ? (
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
                                                        )}
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
                                        <form action="/like" method="post">
                                            <input type="hidden" name="targetPost" value={post.postDetails._id} />
                                            <input type="hidden" name="postedby" value={post.postDetails.postedby} />
                                            <button className="linkButton" type="submit">
                                                <i className="fa-regular fa-thumbs-up"></i> Like
                                            </button>
                                        </form>
                                        {/* =============================================================== end ============================================================ */}
                                        <div className="specialLink">
                                            <Link to="#" data-bs-toggle="modal" data-bs-target={`#commentModal${post.postDetails._id}`}>
                                                <i className="fa-regular fa-comment"></i> Comment
                                            </Link>
                                        </div>

                                                                                            {/* code for the commentModal */}

                                        <div className="modal fade mt-5" id={`commentModal${post.postDetails._id}`} tabIndex="-1" aria-labelledby="articleModalLabel" aria-hidden="true" style={{ color: 'black' }}>
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
                                                                    <img src={user.imageUrl} alt="profileImg" />
                                                                </div>

                                                                {/* =======================================implement api for comment on post=========================================== */}

                                                                <form action="/comment" method="post" style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', width: '100%' }}>
                                                                    <input type="text" name="comment" placeholder="Add a comment" style={{ border: '1px solid black', width: '100%' }} />
                                                                    <input type="hidden" name="targetPost" value={post.postDetails._id} />
                                                                    <input type="hidden" name="postedby" value={post.postDetails.postedby} />
                                                                    <button type="submit" className="submitButton" style={{ padding: '1rem', borderRadius: '50%' }}><i className="fa-sharp fa-solid fa-paper-plane"></i></button>
                                                                </form>
                                                                {/*===================================================== end ===========================================================*/}
                                                            </div>
                                                            {post.commentDetails.length > 0 ? (
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
                                                            )}
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
                            ))
                        ) : (
                            <h1 style={{ color: 'white' }}>No Posts Found!</h1>
                        )}
                    </div>
                    <div className="right-content content">
                        <div className="card">
                            <h5>Mascot News</h5>
                            <ul className="newsSection">
                                <li>
                                    <i className="fa-solid fa-circle"></i> Mascot announces new tools for job seekers
                                    Mascot has just released a suite of new tools to help job seekers find their next career move. Mascot hopes that these new tools will help job seekers feel more confident and empowered in their job search.
                                </li>
                                <li>
                                    <i className="fa-solid fa-circle"></i> Microsoft acquires Mascot Learning
                                    Microsoft has acquired Mascot Learning, the educational arm of the professional social media platform. With this acquisition, Microsoft hopes to expand its e-learning offerings and provide more educational resources to its users.
                                </li>
                                <li>
                                    <i className="fa-solid fa-circle"></i> Mascot releases diversity report, outlines plans for improvement
                                    In an effort to be more transparent about its diversity initiatives, Mascot has released its annual diversity report. The report outlines the company's current demographics and highlights areas where improvements need to be made.
                                </li>
                                {/* ... more news items */}
                            </ul>
                            <div className="specialLink">
                                <Link to="#">Show More</Link>
                            </div>
                        </div>
                        {/* photo modal */}
                        <div className="modal fade mt-5" id="photoModal" tabIndex="-1" aria-labelledby="articleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Add a Photo</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        {/*=========================================== photo post api ====================================================== */}
                                        <form action="/post" method="post">
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">What's in your mind</label>
                                                <input type="text" className="form-control" name="caption" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Image URL</label>
                                                <input type="text" className="form-control" name="imageUrl" />
                                            </div>
                                            <button type="submit" className="btn submitButton" style={{ width: '100%' }}>Post</button>
                                        </form>
                                        {/*================================================= end ==========================================================*/}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal fade mt-5" id="articleModal" tabIndex="-1" aria-labelledby="articleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Write an Article</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        {/*========================================== article post api ========================================================*/}
                                        <form action="/post" method="post">
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">What's in your mind</label>
                                                <textarea className="form-control" name="caption" rows="3"></textarea>
                                            </div>
                                            <button type="submit" className="btn submitButton" style={{ width: '100%' }}>Post</button>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
};

export default HomeComponent;
